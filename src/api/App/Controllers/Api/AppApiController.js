'use strict';
const momment = require('moment');

const App  = require('../../Models/App');
const User = require('../../Models/User.js');

class AppApiController {

    async index(req, res) {
        await App.findAll().then(apps => {
            console.log(apps);
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = AppApiController;