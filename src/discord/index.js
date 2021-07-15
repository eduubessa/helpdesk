const Discord = require('discord.js');
const config = require('./Config/discord');
const database = require('./Database/database');

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const Commands = require('./App/Commands')(client);

client.login(config.development.token);
