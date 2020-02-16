const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = mongoose.Schema({
    avatar : {
        type: String,
        required: true,
        default: 'https://picsum.photos/600/600'
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    created_at : {
        type : Date,
        required : true,
        default : moment.now()
    },
    updated_at : {
        type : Date,
        required : true,
        default : moment.now()
    },
    actived : {
        type : Boolean,
        required : true,
        default : false
    }
});

module.exports = mongoose.model('User', UserSchema);

