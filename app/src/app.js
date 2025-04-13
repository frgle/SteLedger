import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import ApiRoute from './routes/api.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ip = "localhost";
const port = 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("congratulations");
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/pages/test.html');
});

app.use('/api', ApiRoute);

app.listen(port, ip, () => {
    console.log(`Server listening on: ${ip}:${port}`);
});