const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkAndCreateEnv() {
  const envPath = '.env';

  if (fs.existsSync(envPath)) {
    console.log('Config loaded!');
  } else {
    createEnvFile();
    console.log('Config file created!');
  }
}

function createEnvFile() {
  const defaultConfig = `
R_IP=""
R_PORT=2305
R_KEY=""
Q_PORT=27016
KILLFEED_SOURCE_ID=0
KILLFEED_TARGET_ID=0
STATISCTIC_SOURCE_ID=0
DISCORD_SERVER_ID=0
DISCORD_BOT_KEY=""
API_LOGIN=""
API_PASSWORD=""
  `;

  fs.writeFileSync('.env', defaultConfig.trim());
  process.exit(0); 
}

module.exports = { checkAndCreateEnv };