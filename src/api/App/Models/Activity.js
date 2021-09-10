const mongoose = require('mongoose');
const moment = require('moment');

const ActivitySchema = mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
     },
     message: {
          type: String,
          required: true
     },
     visible: {
          type: Boolean,
          required: true,
          default: true
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

module.exports = mongoose.model('Activity', ActivitySchema)