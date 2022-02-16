const mongoose = require("mongoose");
const app = require("../Config/app");
const database = require("../Config/database");

class Database {

    connection = null;

    constructor() {
        if(app.debug === true) {
            if(database.development.auth === false) {
                this.connection_string = `${database.development.driver}://${database.development.host}:${database.development.port}/${database.development.index}`;
            }else{
                this.connection_string = `${database.development.driver}://${database.development.user}:${database.development.password}@${database.development.host}:${database.development.port}/${database.development.index}`;
            }
        }else{
            if(database.production.auth === false) {
                this.connection_string = `${database.production.driver}://${database.production.host}:${database.production.port}/${database.production.index}`;
            }else{
                this.connection_string = `${database.production.driver}://${database.production.user}:${database.production.password}@${database.production.host}:${database.production.port}/${database.production.index}`;
            }
        }
    }

    async connect () {
        this.connection_string = `mongodb+srv://helpdesk_admin:cf4pPAEGTEVcZ9Ay@helpdesk-cluster.usuiy.azure.mongodb.net/helpdesk?retryWrites=true&w=majority`;
        this.connection = await mongoose.connect(this.connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then(x => {
            console.log(`Database connected: ${x.connections[0].name}`);
        }).catch(err => {
            console.log(err);
        });
    }

    async disconnect(){
        await this.connection.close();
    }
}

const d = new Database();
d.connect();
