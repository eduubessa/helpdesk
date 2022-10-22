'use strict';
const User = require('../../Models/User');
const Profile = require('../../Models/Profile');
const Ticket = require('../../Models/Ticket');
const TicketStoreValidator = require('../../Requests/TicketStoreValidator');
const TicketUpdateValidator = require('../../Requests/TicketUpdateValidator');
const {unix} = require("moment");

class TicketApiController {
    async show(request, response, next) {

    }
}
