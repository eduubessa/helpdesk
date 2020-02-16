'use strict';
const crypto = require('crypto');

const User = require('../Models/User');

class UserController {

    async index (request, response, next) {
        await User.find({}, (err, users) => {
            if(err) {
                response.status(500).json({ error: 500, message: 'Não foi possivel encontrar tickets, tente novamente!'});
                throw err;
            }

            if(users.length > 0)
            {
                response.status(200).json({ users : users })
            }else{
                response.status(200).json({ message : 'Neste momento não temos utilizadores na nossa base de dados, crie o primeiro utilizador'});
            }
        }).select(['-_id', '-password', '-__v']);
    }
}

module.exports = UserController;
