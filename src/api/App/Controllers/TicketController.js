'use strict';
const crypto = require('crypto');

const Ticket = require('../Models/Ticket');
const TicketStoreValidator = require('../Requests/TicketStoreValidator');
const TicketUpdateValidator = require('../Requests/TicketUpdateValidator');

class TicketController {

    ticketStoreValidator = null;
    ticketUpdateValidator = null;

    /**
     *
     * @param request
     * @param response
     * @param next
     * @returns {*|Promise<Response>}
     */
    async index (request, response, next)
    {
        await Ticket.find({}, (err, tickets) => {
            if(err) {
                response.status(500).json({ error: 500, message: 'Não foi possivel encontrar tickets, tente novamente!'});
                throw err;
            }

            if(tickets.length > 0)
            {
                response.status(200).json({ tickets : tickets })
            }else{
                response.status(200).json({ message : 'Neste momento não temos tickets na nossa base de dados, crie o primeiro ticket'});
            }
        }).populate('created_by', '-_id -email -password -created_at -updated_at -__v')
            .populate('supported_by', '-_id -email -password -created_at -updated_at -__v')
            .select(['-_id', '-__v']);
    }

    /**
     *
     *
     * @param request
     * @param response
     * @param next
     * @returns {*|Promise<Response>}
     */
    store (request, response, next)
    {
        let ticket = new Ticket;
        ticket.title = request.body.title;
        ticket.departament = request.body.departament;
        ticket.priority = request.body.priority;
        ticket.message
        ticket.isClosed = false;
        ticket.slug = crypto.randomBytes(12).toString('hex');
        ticket.created_by = "5d0a485b1fe6c159d497bbb3";
        ticket.supported_by = "5d0a101f5ebd97156443c11b";

        ticket.save((err, ticket) => {
            if(err) {
                return response.status(500).json({
                    error: 500,
                    errorMessage: err,
                    message: "Não foi possível criar o ticket, tente novamente mais tared!"
                });
            }else{
                return response.status(200).json({
                    message: "O seu ticket foi criado com sucesso",
                    ticket: ticket
                });
            }
        });
    }

}

module.exports = TicketController;
