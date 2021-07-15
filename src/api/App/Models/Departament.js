const mongoose = require('mongoose');
const moment = require('moment');

const DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        required: true,
        default: moment.now()
    },
    updatedAt: {
        type: String,
        required: true,
        default: moment.now()
    }
});

module.exports = mongoose.model('Department', DepartmentSchema)