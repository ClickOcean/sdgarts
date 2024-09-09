import { app } from './app.js';
import http from 'http';
import https from 'https';
import fs from 'fs';

console.info('Server starting');

process.on('uncaughtException', (err) =>
    console.error(`uncaughtException ${err}\n${err.stack}`));
process.on('unhandledRejection', (err) =>
    console.error(`unhandledRejection ${err}\n${err.stack}`));

const PORT = parseInt(process.env.PORT) || 80;

const server = PORT === 80
    ? http.createServer(app)
    : https.createServer({
        cert: fs.readFileSync('./cert/server.cert'),
        key: fs.readFileSync('./cert/server.key'),
    }, app);

server.listen(PORT, () => console.info(`Listening on port ${PORT}...`));
