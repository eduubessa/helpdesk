import express from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as process from "process";
import Database from './Database';

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const db = Database;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

