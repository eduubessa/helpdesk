const mongoose = require('mongoose');
const moment = require('moment');

const commandSchema = mongoose.Schema({
    command : {
        type : String,
        required : true
    },
    used_count : {
        type : Number,
        default : 0,
        required : true
    }
});

module.exports = mongoose.model('Command', commandSchema);