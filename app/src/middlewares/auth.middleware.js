import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function requireLogin(req, res, next) {
    const user = req.user;
    if (!user) return res.status(401).send('Login requerido');
    next();
}