const mongoose = require('mongoose');
const moment = require('moment');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cover: {
        type: String,
        required: true,
        default: 'https://picsum.photos/600/600'
    },
    description: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    upodated_at: {
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
});
