const mongoose = require("mongoose");
const app = require("../Config/app");
const database = require("../Config/DataBase");

let connectionString = null;

if(app.debug === true){
    if(database.development.auth === true) {
        connectionString = `${database.development.driver}+srv://${database.development.username}:${database.development.password}@${database.development.host}/${database.development.index}?retryWrites=true&w=majority`;
    }else {

        connectionString = `mongodb://localhost:27017/helpdesk`;
    }

    
}else{
    if(database.production.auth === true) {
        connectionString = `${database.production.driver}+srv://${database.production.username}:${database.production.password}@${database.production.host}/${database.production.index}?retryWrites=true&w=majority`;
    }else{
        connectionString = `${database.production.driver}+srv://${database.production.host}:${database.production.port}/${database.production.index}?retryWrites=true&w=majority`;
    }
}

const connection = async () => {
    try {
        if(app.debug === true){
            await mongoose.connect(connectionString, database.development.options);
        }else{
            await mongoose.connect(connectionString, database.production.options);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

connection();