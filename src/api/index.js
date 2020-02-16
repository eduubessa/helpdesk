const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const momentTimezone = require('moment-timezone');
const app = express();

moment.locale('pt');

//Configurations
const server = require('./Config/app.json');

//Database
const database = require('./Database/database');

//Router
const routerAPI = require('./Routes/api');
const routerWeb = require('./Routes/web');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', routerAPI);
app.use('/', routerWeb);

if(server.debug === true) {
    app.use('/', (request, response, next) => {
        app.use(morgan('dev'));
        console.log("Starting configuration cors on web server");
        next();
    });

    app.use((err, request, response, next) => {
       response.status(err.status || 500).json({
           error: err,
           message: err.message
       });
    });
}else{
    app.use(morgan('production'));
    app.use((request, response, next) => {
        next();
    });
    app.use((err, request, response, next) => {
        response.status(err.status || 500).json({
            error: {},
            message: err.message
        });
    });
}

app.use('/', express.static('Public'));

//Error 404 - Page not found
app.use((request, response, next) => {
    const err = new Error('ERROR 404 - Page not found');
    err.status = 404;
    response.redirect('/error/404');
});

//Error 500 - Internal Server Error
app.use((request, response, next) => {
    response.status(request.status || 500);
    response.json({
        error: {
            status: request.status,
            message: request.message
        }
    });
});

app.listen(server.port, server.host, (request, response) => {
    console.log(`Listening to requests on ${server.host}`);
});

module.exports = app;
