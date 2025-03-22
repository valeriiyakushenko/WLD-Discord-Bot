const express = require('express');
const basicAuth = require('basic-auth');
const { checkAndCreateEnv } = require('./env');
const { getPlayerCount } = require('./bot');

checkAndCreateEnv();
require('dotenv').config();

const app = express();
const port = process.env.API_PORT;

const authMiddleware = (req, res, next) => {
    const user = basicAuth(req);

    if (!user || user.name !== process.env.API_LOGIN || user.pass !== process.env.API_PASSWORD) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
        return res.status(401).send('Unauthorized');
    }

    next();
};

app.use(authMiddleware);

app.get('/stats', (req, res) => {
    const playerCount = getPlayerCount();
    res.json({ playerCount });
});

app.listen(port, () => {
    console.log(`Api started on http://localhost:${port}`);
});