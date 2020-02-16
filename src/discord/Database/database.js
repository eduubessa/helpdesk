const mongoose = require('mongoose');
const config = require('../Config/database');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const database_connection  = mongoose.connect('mongodb://localhost/helpdesk');

module.exports = database_connection;