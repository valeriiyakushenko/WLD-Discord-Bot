const { Client, GatewayIntentBits } = require('discord.js');
const { getPlayerCount, sendMessageToAll } = require('./rcon');

require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let playerCount = 0;
exports.getPlayerCount = () => playerCount;

client.once('ready', async () => {
    console.log('Bot is logged in!');
    
    setInterval(async () => {
        playerCount = await getPlayerCount();
        if (playerCount !== null) {
            await client.user.setPresence({
                activities: [{ name: `${playerCount}/60`, type: 0 }],
                status: 'dnd',
            });
        }

    }, 5000);
});

client.on('messageCreate', async (message) => {
    if (message.channel.id !== process.env.KILLFEED_SOURCE_ID) return;

    try {
        let killfeed = '';

        const embed = message.embeds[0];
        const fields = Object.fromEntries(embed.fields.map(field => [field.name, field.value]));
        const victim = fields['Victim:']?.split('\n')[0]; 
        const killer = fields['Killer:']?.split('\n')[0]; 
        const details = fields['Details:'];
        
        const weaponMatch = details.match(/with (\[.*?\]|[^\*]+)/);
        const distanceMatch = details.match(/from \[(.*?)\] meters/);
        
        const weapon = weaponMatch ? weaponMatch[1].replace(/[\[\]]/g, '').trim() : null;
        const distance = distanceMatch ? distanceMatch[1] : null;
        
        if (killer === 'Suicide' || killer === 'Infected' || !killer) {return;}

        if (distance !== null) {
            killfeed = `${victim} got killed by ${killer} (${weapon}, ${(parseFloat(distance)).toFixed(1)}m)`
        } else {
            killfeed = `${victim} got killed by ${killer} (${weapon})`
        }

        await sendMessageToAll(killfeed);

        const target = await client.channels.fetch(process.env.KILLFEED_TARGET_ID);
        await target.send(killfeed);
        
    } catch (error) {
        console.error(error);
    }
});

client.login(process.env.DISCORD_BOT_KEY);