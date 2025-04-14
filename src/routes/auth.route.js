import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.get('/', (req, res) => authController.home(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));
router.get('/token-info', (req, res) => authController.tokenInfo(req, res));
router.get('/profile', (req, res) => res.json(req.user.profile));

export default router;