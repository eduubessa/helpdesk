'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');

const User = require('../../Models/User');
const Ticket = require('../../Models/Ticket');
const TicketStoreValidator = require('../../Requests/TicketStoreValidator');
const TicketUpdateValidator = require('../../Requests/TicketUpdateValidator');
const {unix} = require("moment");

class TicketApiController {

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
    async index (request, response, next) {
        let query = request.query !== null && request.query !== undefined ? request.query : {};

        if(query !== {}) {
            if (request.query.supported_by !== undefined && request.query.supported_by !== "unanswered") {
                let user = await User.findOne({username: request.query.supported_by}).then((user) => {
                    return user;
                });
                query = { supported_by: user._id };
            }else if(request.query.supported_by === "unanswered"){
                query = { supported_by: null }
            }
        }

        await Ticket.find(query, (err, tickets) => {
            if (err) {
                response.status(500).json({
                    error: 500,
                    message: 'Não foi possivel encontrar tickets, tente novamente!'
                });
                throw err;
            }

            if (tickets.length > 0) {
                response.status(200).json({tickets: tickets})
            } else {
                response.status(200).json({message: 'Neste momento não temos tickets na nossa base de dados, crie o primeiro ticket'});
            }
        }).populate('created_by', '-_id -email -password -created_at -updated_at -__v')
            .populate('supported_by','-_id -email -password -created_at -updated_at -__v')
            .select(['-_id', '-__v']).sort([['priority', -1], ['updated_at', -1], ['created_at', -1]]);
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
        ticket.is_closed = false;
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
        let user = undefined;

        user = await User.findOne({ username: "eduubessa" }).then((user, err) => {
            return user;
        });

        if(user !== undefined && user !== null){
            let ticketAndUpdate = await Ticket.updateOne({slug: request.body.slug}, { $set: { is_closed: false, supported_by: user._id }}, { new: false}, (err, ticket) => {
                return response.status(200).json({
                    message: 'O ticket foi aceite com sucesso!',
                    ticket: ticket
                });
            }).catch((err) => {
                console.log(err);
                return response.status(500).json({
                    error: 500,
                    message: 'Não foi possivel aceitar este ticket'
                });
            });
        }else{
            return response.status(500).json({
                error: 500,
                message: 'Não foi possivel aceitar este ticket'
            });
        }
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
        let ticketAndUpdate = await Ticket.updateOne({slug: request.body.slug}, { $set: { is_closed: request.body.is_closed, is_reopen: request.body.is_reopen }}, { new: false}, (err, ticket) => {
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
        let ticketAndUpdate = await Ticket.updateOne({ slug: request.body.slug}, { $set: { is_closed: true }}, { new: false}, (err, ticket) => {
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
         let ticketAndDelete = await Ticket.deleteOne({ slug: request.body.slug}, { new: false}, (err, ticket) =>{
             if(err) throw err;
             return response.status(200).json({ message : 'Ticket apagado com sucesso!'});
         }).catch((err) => {
             return response.status(404).send('ERROR 404 - Page Not Found');
         });
    }

}

module.exports = TicketApiController;
