import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
});

export const User = mongoose.model('User', UserSchema);

export const fetchUsers = () => User.find();

export const fetchUserByEmail = (email: string) => User.findOne({ email });

export const fetchUserByUsername = (username: string) => User.findOne({ username });

export const fetchUserBySessionToken = (sessionToken: string) => User.findOne({
    'authentication.sessionToken': sessionToken
});

export const getUserById = (id: string) => User.findById(id);

export const createUser = (values: Record<string, any>) => new User(values)
    .save()
    .then((user) => user.toObject());

export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);

export const updateUserByUsername = (username: string, values: Record<string, any>) => User.findOneAndUpdate({ username }, values);

export const updateUserByEmail = (email: string, values: Record<string, any>) => User.findOneAndUpdate({ email }, values);

export const deleteUserById = (id: string) => User.findByIdAndDelete(id);

export const deleteUserByUsername = (username: string) => User.findOneAndDelete({ username });

export const deleteUserByEmail = (email: string) => User.findOneAndDelete({ email });
