const Discord = require('discord.js');
const discordConfig = require('./Config/discord');
//Database
let database = require('./Database/database');
//Commands
const ticketCommand = require('./App/Commands/TicketCommand');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Bot is now connected!");
});

client.on('message', (message) => {
    if(message.author.id !== 'helpdesk' && message.content.startsWith('!helpdesk')){
        if(message.content.startsWith('!helpdesk-ticket-view')){
            //Comando para ver um ticket específico
            ticketCommand.show(message);
        }else if(message.content.startsWith('!helpdesk-tickets-all')){
            //Comando para ver todos os tickets (apenas para administradores)
            if(message.member.hasPermission("ADMINISTRATOR")){
                ticketCommand.index(message);
            }
        }
        message.delete(1000);
    }
});

client.login(discordConfig.development.token);