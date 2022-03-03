'use strict';

const cors      = require('cors');
const dotenv    = require('dotenv');
const morgan    = require('morgan');
const moment    = require('moment');
const express   = require('express');
const bodyParse = require('body-parser');
const mongoose  = require('mongoose');

const User      = require('./App/Models/User');
const Ticket    = require('./App/Models/Ticket');
const Message   = require('./App/Models/Message');
const Activity  = require('./App/Models/Activity');

dotenv.config();

const app       = express();
const http      = require("http").Server(app);
const io        = require("socket.io")(http, {
    cors: {
        origin: '*'
    }
});

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

http.listen(server.port, server.host, (request, repsonse) => {
    console.log(`Server started at: ${server.host}:${server.port}`);
});

module.exports = app;



