const { Client, Intents } = require('discord.js');
const client = new Client({ intents: Intents.FLAGS.GUILDS});

const config = require('./Config/discord.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        console.log("Hello world")
        await interaction.reply('Pong!');
    }
});

client.login(config.development.token);
