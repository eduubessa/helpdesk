const express = require('express');
const router = express.Router();

//Requires
const AuthApiController        = require('../App/Controllers/Api/AuthApiController');
const UserApiController        = require('../App/Controllers/Api/UserApiController');
const TicketApiController      = require('../App/Controllers/Api/TicketApiController');
const MessageApiController     = require('../App/Controllers/Api/MessageApiController');
const SettingsApiController    = require('../App/Controllers/Api/SettingsApiController');
const DepartmentApiController  = require('../App/Controllers/Api/DepartmentApiController');

//Instances
let authApiController          = new AuthApiController();
let userApiController          = new UserApiController();
let ticketApiController        = new TicketApiController();
let messageApiController       = new MessageApiController();
let settingsApiController      = new SettingsApiController();
let departmentApiController    = new DepartmentApiController();

// Authentication route
router.post('/auth/sign-in', authApiController.signIn)
router.post('/auth/sign-out', authApiController.signOut)

//Users route
router.get('/users',                userApiController.index);
router.post('/users',               userApiController.store);
router.delete('/users',             userApiController.delete);
router.get('/users/:username',      userApiController.show);

//Tickets route
router.get('/tickets',              ticketApiController.index);
router.get('/tickets/:slug',        ticketApiController.show);
router.post('/tickets',                  ticketApiController.store);
router.delete('/ticket/:slug',      ticketApiController.destroy);


// Update infos
router.patch('/ticket/accept',      ticketApiController.updateAndAcceptSupport);
router.patch('/ticket/reopen',      ticketApiController.updateAndReopen);
router.patch('/ticket/close',       ticketApiController.updateAndClose);

// Departments routes
router.get('/departments',          departmentApiController.index);
router.get('/departments/:slug',    departmentApiController.show);
router.post('/departments',         departmentApiController.store);

// Messages
router.put('/messages',             messageApiController.upload);

//Settings route
router.get('/settings',             messageApiController.index);

module.exports = router;
