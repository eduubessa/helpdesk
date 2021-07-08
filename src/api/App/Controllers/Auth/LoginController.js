const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const config = require('../../../Config/auth');

class LoginController {

    async login(request, response) {

        const user = await User.findOne({username: request.body.username});

        if (request.body.password !== null && user !== null) {

            if (!user) {
                return response.status(400).json({error: 400, message: "Utilizador não encontrado!"});
            }

            if (!await bcrypt.compare(request.body.password, user.password)) {
                return response.status(400).json({error: 400, message: "Password inválida"});
            }

        } else {
            return response.status(400).json({error: 400, message: "Introduza uma password!"});
        }

        let token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        });

        user.password = undefined;

        return response.status(200).json({user: user, token: token});



    }

}

module.exports = LoginController;
