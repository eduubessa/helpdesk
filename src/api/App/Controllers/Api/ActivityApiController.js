'use strict';

const moment = require('moment');

const User = require('../../Models/User');
const Activity = require('../../Models/Activity');

class ActivityApiController {

    /**
     * Fetch all activities
     */
    async index(request, response, next) {
        await Activity.find({}, (err, activities) => {
            if(err) {
                response.status(500)({
                    error: 500,
                    message: 'Não foi possivel encontrar actitivades, tente novamente!'
                });
                throw err;
            }

            if(activities.length > 0){
                return response.status(200).json({ activities: activities })
            }else{
                return response.status(200).json({
                    message: 'Neste momento não há atividades registadas'
                })
            }
        }).populate('user').sort([['updated_at', -1], ['created_at', -1]]).select(['-_id', '-__v']).limit(5);
    }

    /**
     * Fetch all activities by user
     */
    async show(request, response, next) {
        let user = undefined;

        user = await User.findOne({ username: request.params.username },  (err, user) => {
            return user;
        });

        if(user !== undefined && user !== null) {
            await Activity.find({}, (err, activities) => {
                if(err) {
                    return response.status(500)({
                        error: 500,
                        message: 'Não foi possivel encontrar actitivades, tente novamente!'
                    });
                }

                if(activities.length > 0){
                    return response.status(200).json({ activities: activities })
                }else{
                    return response.status(200).json({
                        message: 'Este utilizador não tem atividades registadas'
                    })
                }
            });
        }

        return response.status(500).json({
            error: 500,
            message: 'Não foi possivel encontrar as atividades deste utilizador, tente novamente!'
        });
    }

    /**
     * Store new activity
     */
    async store(request, response, next) {
        let user = undefined;
        user = await User.findOne({ username: request.body.user }, (err, user) => {
            return user;
        });

        if(user !== undefined && user !== null) {
            let activity = new Activity;
            activity.user = user._id;
            activity.message = request.body.message;
            activity.visible = true;
            activity.created_at = moment.now();
            await activity.save((err, activity) => {
                if(err) {
                    return response.status(500).json({
                        error: 500,
                        message: 'Não foi possivel criar a atividade, tente novamente!'
                    });
                }else{
                    return response.status(200).json({
                       message: 'A atividade foi criada com sucesso',
                       activity: activity
                    });
                }
            });
        }else {
            return response.status(500).json({
                error: 500,
                message: 'Não foi possivel criar a atividade, tente novamente!'
            });
        }
    }
}

module.exports = ActivityApiController;