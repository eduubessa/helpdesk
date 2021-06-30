const mongoose = require('mongoose');
const app = require('../Config/app');
const database = require('../Config/database');

let connection = null;

if(app.debug === true){
    mongoose.set('useNewUrlParser', database.development.options.useNewUrlParser);
    mongoose.set('useFindAndModify', database.development.options.useFindAndModify);
    mongoose.set('useCreateIndex', database.development.options.useCreateIndex);
    mongoose.set('useUnifiedTopology', database.development.options.useUnifiedTopology);

    console.log(`Database is connected to your application!`);

    if(database.development.auth === true) {
        connection = mongoose.connect(`${database.development.driver}+srv://${database.development.username}:${database.development.password}@${database.development.host}/${database.development.index}?retryWrites=true&w=majority`);
    }else {
        connection = mongoose.connect(`${database.development.driver}://${database.development.host}/${database.development.index}?retryWrites=true&w=majority`);
    }
}else{
    mongoose.set('useNewUrlParser', database.production.options.useNewUrlParser);
    mongoose.set('useFindAndModify', database.production.options.useFindAndModify);
    mongoose.set('useCreateIndex', database.production.options.useCreateIndex);
    mongoose.set('useUnifiedTopology', database.development.options.useUnifiedTopology);

    if(database.production.auth == true) {
        connection = mongoose.connect(`${database.production.driver}+srv://${database.production.username}:${database.production.password}@${database.production.host}/${database.production.index}?retryWrites=true&w=majority`);
    }else{
        connection = mongoose.connect(`${database.production.driver}+srv://${database.production.host}:${database.production.port}/${database.production.index}?retryWrites=true&w=majority`);
    }
}

module.exports = connection;
