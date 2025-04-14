import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

import { requireLogin } from './middlewares/auth.middleware.js';
import { authParser } from './middlewares/auth.parser.middleware.js';

import ApiRoute from './routes/api.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ip = process.env.IP;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authParser);

app.get('/', (req, res) => {
    res.send("congratulations");
});

// app.get('/me', requireLogin, (req, res) => {
//     res.json(req.user.profile);
// });

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/pages/test.html');
});

app.get('/home', requireLogin, (req, res) => {
    res.send("bienvenido al home");
});

app.use('/api', ApiRoute);

app.listen(port, ip, () => {
    console.log(`Server listening on: ${ip}:${port}`);
});