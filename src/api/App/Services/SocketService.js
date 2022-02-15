
class SocketService {

    constructor(http) {
        this.http = http;
        this.io = require('socket.io')(http);
    }

    
}

module.exports = new SocketService;