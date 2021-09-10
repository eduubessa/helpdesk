const mongoose = require('mongoose');
const moment = require('moment');

const TicketSchema = mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    departament : {
        type : String,
        required: true
    },
    slug : {
        type: String,
        required : true,
        unique : true
    },
    created_by : {
        type : mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    supported_by : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    priority: {
        type: Number,
        required: true,
        default: 0
    },
    is_closed : {
        type: Boolean,
        required: true,
        default: false
    },
    is_reopen: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        required: true,
        default: moment.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: moment.now()
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
