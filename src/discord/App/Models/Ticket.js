const mongoose = require("mongoose");
const moment = require('moment');

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    departament : {
        type : String,
        required : true,
    },
    priority : {
        type : Number,
        required : true,
        default : 0
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    supported_by : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : 'User'
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    created_at : {
        type : Date,
        default : moment.now()
    },
    updated_at : {
        type : Date,
        default : moment.now()
    },
    isClosed : {
        type : Boolean,
        default : false
    },
});

module.exports = mongoose.model("Ticket", ticketSchema);