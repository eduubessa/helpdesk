'use strict';

const cors      = require('cors');
const dotenv    = require('dotenv');
const morgan    = require('morgan');
const moment    = require('moment');
const express   = require('express');
const bodyParse = require('body-parser');

const User      = require('./App/Models/User');
const Ticket    = require('./App/Models/Ticket');
const Message   = require('./App/Models/Message');
const Activity  = require('./App/Models/Activity');

dotenv.config();

const app       = express();
const http      = require("http").Server(app);


// Load configuration file (config/app.json)
const server = require('./Config/app.json');

// Load connection to database (mongodb)
const database = require('./Database/Database');

// Load all services
const services = require('./App/Services/Services');

// Load socket service (socket.io)
// const socket = require('./App/Services/SocketService')(http);

const routers = {
    api: require('./Routes/api.js'),
    web: require('./Routes/web.js')
}

console.log("Server started at: " + server.host + ":" + server.port);
console.log("Server token: " + process.env.APP_TOKEN);
console.log("Server debug: " + process.env.APP_DEBUG);
console.log("Server database: " + process.env.DB_SERVER + ":" + process.env.DB_PORT);

let options = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(options));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use('/', routers.web);
app.use('/api/v1/', routers.api);
app.set('trust proxy', 1);
app.use('/', express.static(__dirname + '/Public'));

// Error  404 - Page not found
app.use((request, response, next) => {
    const err = new Error('404 Page not found');
    err.status = 404;
    response.redirect('/error/404');
});

// Error 500 - Internal server error
app.use((request, response, next) => {
    const err = new Error('500 Internal Server Error');
    response.status(request.status || 500);
    response.redirect('/error/500');
});

http.listen(server.port, server.host, (request, repsonse) => {
    console.log(`Server started at: ${server.host}:${server.port}`);
});

module.exports = app;



