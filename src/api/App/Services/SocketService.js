const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

module.exports = { io }