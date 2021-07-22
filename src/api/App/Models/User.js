const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

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
        required: true,
        type : String
    },
    token: {
        type: String,
        required: true,
        default: 'supersecret'
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
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    }
});

/**
 * Hash the password before saving the user model
 */
UserSchema.pre("save", async (next) => {
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

/**
 * Generate token to user authentication
 * @returns {Promise<*>}
 */
UserSchema.methods.generateAuthenticationToken = async () => {
    const user = this;
    const token = jwt.sign({_id: user._id, username: user.username, email: user.email }, "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

/**
 * Search for user by username and password
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
UserSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username });
    if(!user) {
        throw new Error({error: "Invalid login details, try again!"});
    }
    const isPasswordMatch = await(bcrypt.compare(password, user.password));
    if(!isPasswordMatch){
        throw new Error({ error: "Invalid login details, try again!"});
    }
    return user;
};

module.exports = mongoose.model('User', UserSchema);

