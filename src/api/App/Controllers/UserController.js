'use strict';
const crypto = require('crypto');

const User = require('../Models/User');

class UserController {

    /**
     * Fetch all users
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async index (request, response, next) {
        await User.find({}, (err, users) => {
            if(err) {
                response.status(500).json({ error: 500, message: 'Não foi possivel encontrar utilizadores, tente novamente!'});
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

    /**
     *  Find One user by request username param
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async show (request, response, next)
    {
        await User.findOne({ username : request.params.username }, (err, user) => {
            if(err) {
                response.status(500).json({ error: 500, message: err});
                throw err;
            }

            if(user != null)
            {
                response.status(200).json({ user : user })
            }else{
                response.status(200).json({ message : 'Neste momento não temos utilizadores na nossa base de dados, crie o primeiro utilizador'});
            }
        }).select(['-_id', '-password', '-__v']);
    }

    /**
     * Store new user
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async store (request, response, next)
    {

        User.findOne({ $or: [{ username : request.body.username }, { email: request.body.email}] }).then((user) => {
            console.log(user);
        });

        let newUser = new User;
        newUser.firstname = request.body.firstname;
        newUser.lastname = request.body.lastname;
        newUser.username = request.body.username;
        newUser.email = request.body.email;

        user.setPassword(request.body.password);



    }
}

module.exports = UserController;
