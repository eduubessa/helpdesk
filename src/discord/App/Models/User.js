const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    avatar : {
        type : String,
        default : 'avatar.default.png'
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
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    enterprise : {
        type : String,
        required : true
    },
    outsourcing : {
        type : Boolean,
        required : true,
        default : true
    },
    skype : {
        type : String,
        required : false
    },
    website : {
        type : String,
        required : false
    },
    isActived : {
        type : Boolean,
        required : true,
        default : false
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
    }
});

module.exports = mongoose.model('User', userSchema);