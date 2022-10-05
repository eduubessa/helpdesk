const fs = require('fs');

module.exports = (client) => {
    client.EventsHanlder = async () => {
        let side_of_events = fs.readdirSync('./App/Events/');
        console.log("\n\x1b[32mLoading events...\x1b[37m");
        for(let side of side_of_events){
            switch(side){
                case 'Client':
                    for(let file of fs.readdirSync('./App/Events/Client').filter(file => file.endsWith('Event.js'))){
                        let event = require(`../Events/Client/${file}`);
                        if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                        console.log(`Loaded: App/Events/Client/${file}`);
                    }
                    break;
                default:
                    break;
            }
        }

    }
}
