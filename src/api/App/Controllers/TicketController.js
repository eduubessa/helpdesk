'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');

const Ticket = require('../Models/Ticket');
const TicketStoreValidator = require('../Requests/TicketStoreValidator');
const TicketUpdateValidator = require('../Requests/TicketUpdateValidator');

class TicketController {

    ticketStoreValidator = null;
    ticketUpdateValidator = null;

    /**
     *  Fetch all tickets
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
            .select(['-_id', '-__v'])
            .sort([['priority', -1], ['updated_at', -1], ['created_at', -1]]);
    }

    /**
     *
     * Fetch one ticket
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async show (request, response, next)
    {
        await Ticket.findOne({ slug : request.params.slug }, (err, ticket) => {
            if(err) throw err;
            if(ticket === null || ticket === ""){
                return response.status(404).send("ERROR 404 - Page Not Found");
            }else{
                response.status(200).json(ticket);
            }
        }).catch((err) => {
            response.status(500).send(err);
        })
    }

    /**
     * Save ticket on database
     *
     * @param request
     * @param response
     * @param next
     * @returns {*|Promise<Response>}
     */ cd
    store (request, response, next)
    {
        let ticket = new Ticket;
        ticket.title = request.body.title;
        ticket.departament = request.body.departament;
        ticket.priority = request.body.priority;
        ticket.isClosed = false;
        ticket.slug = crypto.randomBytes(12).toString('hex');
        ticket.created_by = request.body.created_by;
        ticket.supported_by = null;
        ticket.save((err, ticket) => {
            if(err) {
                response.status(500).json({
                    error: 500,
                    errorMessage: err,
                    message: "Não foi possível criar o ticket, tente novamente mais tared!"
                });
            }else{
                response.status(200).json({
                    message: "O seu ticket foi criado com sucesso",
                    ticket: ticket
                });
            }
        });
    }

    /**
     * Update and Accept ticket support
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async updateAndAcceptSupport(request, response, next)
    {
        let user = mongoose.Types.ObjectId(request.body.supported_by);

        let ticketAndUpdate = await Ticket.findOneAndUpdate({slug: request.body.slug}, { $set: { isClosed: true, supported_by: user }}, { new: false}, (err, ticket) => {
            if(err) throw err;
            return response.status(200).json(ticket);
        }).catch((err) => {
            return response.status(404).send("ERROR 404 - Page Not Found");
        });
    }

    /**
     * Update: Reopen ticket support
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async updateAndReopen(request, response, next)
    {
        let ticketAndUpdate = await Ticket.findOneAndUpdate({slug: request.body.slug}, { $set: { isClosed: request.body.is_closed, isReopen: request.body.is_reopen }}, { new: false}, (err, ticket) => {
            if(err) throw err;
            return response.status(200).json(ticket);
        }).catch((err) => {
            return response.status(404).send("ERROR 404 - Page Not Found");
        });
    }

    /**
     * Update: Solved and close ticket
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async updateAndClose(request, response, next) {
        let ticketAndUpdate = await Ticket.findOneAndUpdate({slug: request.body.slug}, { $set: { isClosed: true }}, { new: false}, (err, ticket) => {
            if(err) throw err;
            return response.status(200).json(ticket);
        }).catch((err) => {
            return response.status(404).send("ERROR 404 - Page Not Found");
        });
    }

    /**
     * Delete: Delete ticket
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async destroy(request, response, next) {
         let ticketAndDelete = await Ticket.findOneAndDelete({ slug: request.body.slug}, { new: false}, (err, ticket) =>{
             if(err) throw err;
             return response.status(200).json({ message : 'Ticket apagado com sucesso!'});
         }).catch((err) => {
             return response.status(404).send('ERROR 404 - Page Not Found');
         });
    }

}

module.exports = TicketController;
