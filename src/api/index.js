const path = require('path');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const momentTimezone = require('moment-timezone');

const User = require('./App/Models/User');
const Ticket = require('./App/Models/Ticket');
const Message = require('./App/Models/Message');
const Activity = require('./App/Models/Activity');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

moment.locale('pt');

//Configurations
const server = require('./Config/app.json');

//Database
const database = require('./Database/database');

//Router
const routerAPI = require('./Routes/api');
const routerWeb = require('./Routes/web');
const bcrypt = require("bcrypt");
const {unix} = require("moment");
const mongoose = require("mongoose");

dotenv.config();
console.log("API TOKEN: " + process.env.API_TOKEN_ACCESS);

let options = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', socket => {
    // Chat Message
    socket.on('chat:message', async (msg) => {
        let t = undefined;
        let u = undefined;
        let a = undefined;

        t = await Ticket.findOne({ slug: msg.ticket }).then((ticket) => {
            return ticket;
        });

        a = await User.findOne({ username: msg.author }).then((user) => {
            return user;
        })

        u = await User.findOne({ username: msg.receiver }).then((user) => {
            return user;
        });

        if(t != null && a !== null && a !== undefined && u !== null && u !== undefined) {
            let m = new Message;
            m.ticket = mongoose.Types.ObjectId(t._id);
            m.author = mongoose.Types.ObjectId(a._id);
            m.receiver = mongoose.Types.ObjectId(u._id);
            m.body = msg.body;
            m.is_deleted = false;
            m.created_at = moment.now();
            await m.save((err, message) => {
                console.log(`Mensagem criada e enviada com sucesso de ${a.firstname} ${a.lastname} para ${u.firstname} ${u.lastname}!`)
            });
            io.emit('chat:message', msg);
        }
    });

    // Recent activity
    socket.on('activity:recent', async (activity) => {
        let u = undefined;
        let a = undefined;

        u = await User.findOne({ username: activity.user.username }).then((user) => {
            return user;
        });

        a = new Activity;
        a.user = u._id;
        a.message = activity.message;
        a.visible = true;
        a.created_at = moment.now();

        await a.save(() => {
            io.emit('activity:recent', activity);
        });
    });
});

app.use('/api/v1', routerAPI);
app.use('/', routerWeb);
app.set("trust proxy", 1);

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

http.listen(server.port, server.host, (request, response) => {
    console.log(`Listening to requests on ${server.host}`);
});

module.exports = app;
