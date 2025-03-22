const A3Rcon = require('arma3-rcon');

require('dotenv').config();

let a3r; 

async function connectToServer() {
    if (!a3r) {
        a3r = new A3Rcon(process.env.R_IP, process.env.R_PORT, process.env.R_KEY, {
            enabled: true,
            interval: 5,
            count: 24,
        });

        try {
            const success = await a3r.connect();
            if (!success) { throw new Error('Failed to connect to the server');} 

        } catch (error) {
            console.error(error);
            process.exit(1); 
        }
    }
}

async function getPlayerCount() {
    try {
        const response = await a3r.getPlayerCount();
        return response;

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function sendMessageToAll(message) {
    try {
        const response = await a3r.say(`${message}`);
        return response;

    } catch (error) {
        console.error(error);
        return null;
    }
}

connectToServer();

module.exports = { getPlayerCount, sendMessageToAll };
