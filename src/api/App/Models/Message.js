'use strict';

const mongoose = require('mongoose')
const moment = require('moment')

const MessageSchema = mongoose.Schema({
    ticket: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    body: {
      type: String,
      required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_at: {
        type: Date,
        required: true,
        default: moment.now()
    },
    read_at: {
        type: Date,
        required: true,
        default: moment.now()
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Message', MessageSchema);