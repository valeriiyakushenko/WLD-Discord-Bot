const { checkAndCreateEnv } = require('./env');
checkAndCreateEnv(); 

const { connectToServer } = require('./rcon');
require('./bot'); 

async function start() {
    await connectToServer();
}

start();
