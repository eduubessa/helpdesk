const Ticket = require('../Models/Ticket');

//Controller
const ticketController = require('../Controllers/TicketController');

exports.index = (message) => {
    ticketController.index(message);
};

exports.show = async (message) => {
    if(message.content.indexOf('"') > 0){
        let ticketID = message.content.substring(message.content.indexOf('"') + 1, message.content.lastIndexOf('"'));
        ticketController.show(message, ticketID);
    }else{
        message.channel.send(`**ERRO:** Para visualizar os detalhes do ticket necessita de edentificar qual ticket quer visualizar com --id "id_do_ticket"`);
    }
};

exports.create = () => {
    return "O seu ticket foi criado com sucesso! O id do ticket é #3626";
};