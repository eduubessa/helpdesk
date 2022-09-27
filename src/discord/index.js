 const CONFIG = require('./Config/discord');
 const { Client, Collection, GatewayIntentBits } = require('discord.js');
 const fs = require('fs');
 
 const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
 });

 client.commands = new Collection();
 client.commandsArray = [];

 const handlers = fs.readdirSync('./App/Handlers');

 for(let handler of handlers) {
    if(fs.statSync(`./App/Handlers/${handler}`).isFile()) {
        require(`./App/Handlers/${handler}`)(client);
    }
 }

client.EventsHanlder();
client.CommandsHandler();


client.login(CONFIG.development.token); // Login to the bot with the token from the config file