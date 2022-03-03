'use strict';

const moment = require('moment');
const mongoose = require('mongoose');

const User = require('../../Models/User');
const Ticket = require('../../Models/Ticket');
const Message = require('../../Models/Message');
const {unix} = require("moment");

class MessageApiController {

    async index(request, response, next)
    {
        let ticket = undefined;
        let author = undefined;
        let receiver = undefined;

        ticket = await Ticket.findOne({ slug: request.body.ticket }, (err, ticket) => {
            return ticket
        });

        author = await User.findOne({ username: request.body.author }, (err, user) => {
            return user;
        });

        receiver = await User.findOne({ username: request.body.receiver}, (err, user) => {
            return user;
        });

        if(ticket !== undefined && ticket !== null &&
            author !== undefined && author !== null &&
            receiver !== undefined && receiver !== null) {
            await Message.find({ ticket: mongoose.Types.ObjectId(ticket._id), $or:
                    [
                        { $and : [{ author: mongoose.Types.ObjectId(author._id) }, { receiver: mongoose.Types.ObjectId(receiver._id) }]},
                        { $and : [{ author: mongoose.Types.ObjectId(receiver._id) }, { receiver: mongoose.Types.ObjectId(author._id) }]}
                    ]
            }, (err, messages) => {
                if (err) {
                    response.status(500).json({
                        error: 500,
                        message: 'Não foi possivel encontrar utilizadores, tente novamente!'
                    });
                    throw err;
                }

                if (messages.length > 0) {
                    response.status(200).json({messages: messages})
                } else {
                    response.status(200).json({message: 'Não temos mensagens'});
                }
            }).populate('author').select(['-_id', '-__v']);
        }else{
            response.status(500).json({
                error: 500,
                message: 'Não foi possivel encontrar utilizadores, tente novamente!'
            });
        }
    }

    async show(request, response, next)
    {

    }

    async store(request, response, net)
    {
        let message = new Message;
        message.ticket = mongoose.Types.ObjectId(request.body.ticket);
        message.author = mongoose.Types.ObjectId(request.body.author);
        message.receiver = mongoose.Types.ObjectId(request.body.receiver);
        message.body = request.body.content;
        message.is_deleted = false;
        message.created_at = moment.now();
        message.save((err, message) => {
            console.log(message);
            return response.status(200).json({
                message: 'A mensagem foi criada com sucesso!',
                message_content: message
            });
        });
    }

    /**
     * Upload files to message
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<*>}
     */
    async upload(request, response, next)
    {
        return response.status(200).send("Podes fazer download");
    }

}

module.exports = MessageApiController;