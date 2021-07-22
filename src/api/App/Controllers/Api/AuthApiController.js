'use strict';
const User = require('../../Models/User');
const bcrypt = require("bcrypt");

class AuthApiController {

    async signIn (request, response) {
        await User.findOne({username: request.body.username}, async (err, user) => {
            if (err) {
                response.status(500).json({error: 500, message: err});
                throw err;
            }

            if (user != null) {
                console.log(user.password);
                const validatePassword = await bcrypt.compare(request.body.password, user.password);
                if(validatePassword){
                    return response.status(200).json({ user: user, token: user.token });
                }else{
                    return response.status(400).json({ error: 'Utilizador ou password incorretos, por favor tente novamente!'})
                }
            } else {
                response.status(400).json({message: 'Utilizador ou password incorretos, por favor tente novamente!'});
            }
        }).select(['-_id', '-__v']);
    }

    signOut (request, response) {
        console.log(request);
        response.send("Sign Out Page");
    }

}

module.exports = AuthApiController;