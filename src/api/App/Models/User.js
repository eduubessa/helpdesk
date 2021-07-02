const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');

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
        type : String
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
    },
    salt : {
        String
    }
});

/**
 * Set Password
 * @param password
 */
UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');
};

/**
 * Check password is valid
 * @param password
 * @returns {boolean}
 */
UserSchema.methods.validatePass = (password) => {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000,  64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema);

