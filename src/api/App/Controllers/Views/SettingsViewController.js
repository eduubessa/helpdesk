'use strict';

//Middlewares
const CorsMiddlware = require('../../Middlewares/CorsMiddleware');

//Instances
let corsMiddleware = new CorsMiddlware();

class SettingsViewController {

    index (request, response, next) {
        corsMiddleware.origin
        return response.send("hello");
    }
}

module.exports = SettingsViewController;
