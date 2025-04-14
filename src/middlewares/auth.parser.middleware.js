import Profile from '../database/models/profile.model.js';
import User from '../database/models/user.model.js';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

export async function authParser(req, res, next) {
  const token = req.cookies.token;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    req.user = undefined;
    return next();
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;
    const user = await User.findOne({ where: {id: userId} });
    const profile = await Profile.findOne({ where: {userId} });

    if (!user) {
      req.user = undefined;
      return next();
    }

    req.user = {profile: {...profile.dataValues, plan: "basic"}};
    next();
  } catch (err) {
    console.log(err);
    req.user = undefined;
    next();
  }
}