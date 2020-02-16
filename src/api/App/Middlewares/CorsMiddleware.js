'use strict';

//Configurations
const appConfig = require('../../Config/app');
const corsConfig = require('../../Config/cors');

class CorsMiddleware {

    options = null;

    origin (origin, callback)
    {
        if(appConfig.debug === true){
            console.log("Development mode");
            if(corsConfig.dev.origin.indexOf(origin) !== -1){
                callback(null, true)
            }else{
                callback(new Error("Not allowed by CORS"))
            }
        }

        return "pink"
    }
}

module.exports = CorsMiddleware;
