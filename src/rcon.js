const A3Rcon = require('arma3-rcon');
require('dotenv').config();

let a3r; 

async function connectToServer() {
    if (!a3r) {
        a3r = new A3Rcon(process.env.R_IP, process.env.R_PORT, process.env.R_KEY);
        try {
            const success = await a3r.connect();
            if (success) {
                console.log('RCON connected');
            } else {
                throw new Error('Failed to connect to the server');
            }
        } catch (error) {
            console.error('Error connecting to RCON:', error);
            process.exit(1); 
        }
    }
}

async function getPlayerCount() {
    try {
        const response = await a3r.getPlayerCount();
        return response;
    } catch (error) {
        console.error('Error fetching player count:', error);
        return null;
    }
}

module.exports = { connectToServer, getPlayerCount };
