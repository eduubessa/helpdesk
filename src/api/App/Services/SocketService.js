
class SocketService {

    constructor(http) {
        this.http = http;
        this.io = require('socket.io')(http);
        console.log("socket.io loaded");
    }

    
}

module.exports = new SocketService;