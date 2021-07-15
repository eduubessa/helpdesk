const crypto = require('crypto');
const moment = require('moment');
const Ticket = require('../Models/Ticket');

class TicketController {

    async all () {
        return await Ticket.find({}).then((tickets) => { return tickets }).catch((err) => console.error(err));
    }

}

module.exports = TicketController;