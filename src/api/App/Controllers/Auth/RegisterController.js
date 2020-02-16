'use strict'

const moment = require('moment');
const User = require('../../Models/User');

class RegisterController {

    /**
     * Store user
     * @param request
     * @param response
     * @param next
     * @returns {*|Promise<Response>}
     */
    async store(request, response, next) {
        let validation = new UserStoreValidator(request);

        if(validation) {

            await User.findOne({username: request.body.username})
                .then((user) => {
                    if (user !== null) {
                        return response.status(200).json({
                            message: 'O utilizador introduzido já está a ser utilizado!'
                        });
                    }
                }).catch((err) => {
                if (err) throw err;
            });

            await User.findOne({email: request.body.email})
                .then((user) => {
                    if (user !== null) {
                        return response.status(200).json({
                            message: 'O e-mail introduzido já está a ser utilizador!'
                        });
                    }
                }).catch((err) => {
                if (err) throw err;
            });

            let user = new User;
            user.avatar = "";
            user.firstname = request.body.firstname;
            user.lastname = request.body.lastname;
            user.username = request.body.username;
            user.email = request.body.email;
            user.password = this.hashPassowrd(request.body.password);
            user.created_at = moment, now();
        }else{
            return response.json({
                error : 'ERROR_STORE_USER_FORM',
                message : 'Peço que corrija os seguintes errors:',
                form : {
                    errors : validation
                }
            });
        }

    }

    /**
     * Update user information
     * @param request
     * @param response
     * @param next
     */
    update(request, response, next) {

    }

    /**
     * Delete user
     * @param request
     * @param response
     * @param next
     */
    destroy(request, response, next) {

    }

    /**
     * Hash User Passwword
     * @param UserSchema
     * @returns {Promise<*>}
     */
    async hashPassowrd(UserSchema) {
        const password = UserSchema.password;
        const saltRounds = 10;

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            })
        });

        return hashedPassword
    }
}

module.exports = RegisterController;
