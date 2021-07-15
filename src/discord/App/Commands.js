'use strict';

let client;
const TicketsController = require('./Controllers/TicketController');

const ticketsController = new TicketsController();

module.exports = (client) => {
    client.on('message', async (msg) => {
         if(!msg.content.startsWith('!') ||!msg.content.startsWith('/') || msg.author.bot) return;

         const args = messages.content
             .toLowerCase()
             .trim()
             .split(/\s+/);

        // Helpdesk commands
        if(msg.content === "!tickets"){
            let tickets = await ticketsController.all();
            tickets.forEach((ticket) => {
                msg.channel.send(`>>> ${ticket.title}`);
            });
        }

        // Administration commands
        if(msg.content === "/clear" || msg.content("/clean")){
            if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
                return messages.channel.send(`Não tens permissões para usar esse comando!`);
            }
        }
    });
}