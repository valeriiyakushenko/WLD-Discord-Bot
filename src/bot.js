const { Client, GatewayIntentBits } = require('discord.js');
const { connectToServer, getPlayerCount } = require('./rcon');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', async () => {
    console.log('Bot is ready!');
    await connectToServer();

    setInterval(async () => {
        const playerCount = await getPlayerCount();
        if (playerCount !== null) {
            await client.user.setPresence({
                activities: [{ name: `${playerCount}/60`, type: 0 }],
                status: 'online',
            });
        }
    }, 15000);
});

client.login(process.env.DISCORD_BOT_KEY);
