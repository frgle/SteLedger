// src/controllers/user.controller.js
import { AuthService } from '../services/auth.service.js';

import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.secretKey = process.env.JWT_SECRET;
  }

  home(req, res) {
    res.send("Welcome to the auth route home");
  }

  async register(req, res) {
    const { username, password, profile } = req.body;

    if (!username || !password || !profile || !profile.displayName) {
      const response = {status: 400, message: "Credentials missing.", content: null};
      res.send(response);
      return;
    }
    
    const createUserResult =  await this.authService.createUser({ username, password, profile });
    const userId = createUserResult.content.id;

    if (createUserResult.error) {
      const response = createUserResult;
      res.send(response);
      return;
    }

    const response = {status: 200, message: "Account succesfully created.", content: createUserResult};
    res.send(response);
  }

  async login(req, res) {
    const { username, password } = req.body;
    const verifyCredentials = await this.authService.verifyCredentials({username, password});

    if (verifyCredentials.error) {
      const response = verifyCredentials;
      res.send(response);
      return;
    }

    const userId = await this.authService.getId(username);

    const secret = this.secretKey;
    const payload = {userId};
    const generateToken = this.authService.generateToken({payload, secret});

    if (generateToken.error) {
      const response = generateToken;
      res.send(response);
      return;
    }

    const token = generateToken.content;

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });

    const response = {
      status: 200,
      message: "Token created.",
      content: token,
    };

    res.send(response);
  }

  logout(req, res) {
    res.clearCookie('token', {
      httpOnly: true,
    });
  
    const response = {
      status: 200,
      message: "You have been logged out.",
      content: null,
    };
  
    res.send(response);
  }
  
  tokenInfo(req, res) {
    const token = req.cookies.token;

    if (!token) {
      const response = {
        status: 400,
        message: "You don't even have one.",
        content: null
      };
      res.send(response);
      return;
    }

    const secret = this.secretKey;

    const verifyToken = this.authService.verifyToken({token, secret});

    if (verifyToken.error) {
      const response = {
        status: 400,
        message: "Invalid token.",
        content: null
      };
    }

    const tknInfo = {
      payload: verifyToken.content,
      valid: true
    };

    const response = {
      status: 200,
      message: "Token decoded and verified.",
      content: tknInfo
    };

    res.send(response);
  }
}