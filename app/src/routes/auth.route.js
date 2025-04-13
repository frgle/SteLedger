import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.get('/', (req, res) => authController.home(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/token-info', (req, res) => authController.tokenInfo(req, res));

export default router;