const crypto = require('crypto');
const moment = require('moment');
const User = require('../Models/User');
const Ticket = require('../Models/Ticket');

exports.index = (message) => {
    var _vm = this;
    var data = null;

    Ticket.find({ }, (err, tickets) => {
        if(err) throw err;
        if(tickets.length > 0){
            let msg = "**\n\nTodos os Tickets (activos)**\n\n";
            tickets.forEach((ticket) => {
                msg += `**\n\nInformações do Ticket**\n\n**Assunto**: ${ticket.title}\n\n**Criado em**: ${ticket.created_at}\n\n**Criado por**: ${ticket.created_by.firstname + ' ' + ticket.created_by.lastname }\n\n**Técnico responsável**: ${ticket.supported_by.firstname + ' ' + ticket.supported_by.lastname }\n\n**Fechado**: ${ (ticket.isClosed) ? 'Fechado' : 'Em aberto' }\n\n`;
            });
            message.reply(msg);
        }else{
          console.log("Não há tickets!");
        }
    }).populate('created_by').populate('supported_by').sort({
        created_at : -1,
        updated_at : -1
    }).select(['-_id', '-__v']).catch((err) => {
        response.status(500).json({
            error : 500,
            message : err
        });

        throw err;
    });
};

exports.show = (message, id) => {
    Ticket.findOne({ _id : id }, (err, ticket) => {
        if(err) throw err;
        if(ticket !== null){
            let msg = `**\n\nInformações do Ticket**\n\n**Assunto**: ${ticket.title}\n\n**Criado em**: ${ticket.created_at}\n\n**Criado por**: ${ticket.created_by.firstname + ' ' + ticket.created_by.lastname }\n\n**Técnico responsável**: ${ticket.supported_by.firstname + ' ' + ticket.supported_by.lastname }\n\n**Fechado**: ${ (ticket.isClosed) ? 'Fechado' : 'Em aberto' }`;
            message.reply(msg);
        }else{
            console.error("Não encontrou nenhum ticket com esse id!");
        }
    }).populate('created_by').populate('supported_by').catch((err) => {
        if(err) throw err;
    })
};
//
// exports.create = (request, response) => {
//     if(
//         request.body.title !== null &&
//         request.body.departament !== null &&
//         request.body.priority !== null &&
//         request.body.created_by !== null
//     ) {
//         User.findOne({ username : request.body.created_by }, (err, user) => {
//             if(user !== null){
//                 let ticket = new Ticket;
//                 ticket.title = request.body.title;
//                 ticket.departament = request.body.departament;
//                 ticket.priority = request.body.priority;
//                 ticket.slug = crypto.randomBytes(12).toString('hex');
//                 ticket.supported_by = "5d0a5932fd451b50c8323978";
//                 ticket.created_by = user._id;
//                 ticket.save((err, ticket) => {
//                     if(err) {
//                         response.status(500).json({
//                             error: 500,
//                             message : err
//                         });
//                         throw err;
//                     }
//
//                     if(user !== null){
//                         response.status(200).json({
//                             message : "O ticket foi criado com sucesso!",
//                             ticket : ticket
//                         });
//                     }else{
//                         response.status(500).json({
//                             error: 500,
//                             message : 'Não foi possivel criar o ticket, por favor tente novamente mais tarde!'
//                         });
//                     }
//                 })
//             }else{
//                 response.status(401).json({
//                     error : 401,
//                     message : "Inicia sesão para criar um ticket!"
//                 });
//             }
//         }).catch((err) => {
//             response.status(500).json({
//                 error : 500,
//                 message : err
//             });
//
//             throw err;
//         })
//
//     }
// };
//
// exports.update = (request, response) => {
//     Ticket.findOneAndUpdate({ slug : request.params.slug }, {
//         $set : {
//             supported_by : "5d0a101f5ebd97156443c11b",
//             updated_at : moment.now()
//         }
//     }, (err, ticket) => {
//         if(err) throw err;
//         if(ticket !== null){
//             response.status(200).json({
//                 message : "O ticket foi atualizado com sucesso!",
//                 ticket : ticket
//             })
//         }
//     }).populate({
//         path: 'created_by',
//         select : ['-email', '-password', '-created_at', '-updated_at', '-__v']
//     }).populate({
//         path: 'supported_by',
//         select : ['-email', '-password', '-created_at', '-updated_at', '-__v']
//     }).select(['-_id', '-__v']).catch((err) => {
//         response.status(500).json({
//             error : 500,
//             error : err
//         });
//
//         throw err;
//     });
// };
//
// exports.destroy = (request, response) => {
//     Ticket.findOneAndUpdate({ slug : request.params.slug }, {
//         $set : {
//             isClosed : true,
//         }
//     }, (err, ticket) => {
//         if(err) throw err;
//         if(ticket !== null){
//             response.status(200).json({
//                 message : "O ticket foi atualizado com sucesso!",
//                 ticket : ticket
//             })
//         }
//     }).populate({
//         path: 'created_by',
//         select : ['-email', '-password', '-created_at', '-updated_at', '-__v']
//     }).populate({
//         path: 'supported_by',
//         select : ['-email', '-password', '-created_at', '-updated_at', '-__v']
//     }).select(['-_id', '-__v']).catch((err) => {
//         response.status(500).json({
//             error : 500,
//             error : err
//         });
//
//         throw err;
//     });
// };