const express = require('express');
const router = express.Router();

//Requires
const UserController = require('../App/Controllers/UserController');
const TicketController = require('../App/Controllers/TicketController');
const MessageController = require('../App/Controllers/MessageController');
const AuthController = require('../App/Controllers/Auth/LoginController');
const RegisterController = require('../App/Controllers/Auth/RegisterController');
const SettingsController = require('../App/Controllers/SettingsController');

//Instances
let authController = new AuthController();
let registerController = new RegisterController();
let userController = new UserController();
let ticketController = new TicketController();
let messageController = new MessageController();
let settingsController = new SettingsController();

//Auth route
router.post('/auth/register', registerController.store);
router.post('/auth/login', authController.login);

//Users route
router.get('/users', userController.index);
router.post('/users', userController.store);
router.delete('/users', userController.delete);
router.get('/users/:username', userController.show);

//Tickets route
router.get('/tickets', ticketController.index);
router.get('/tickets/:slug', ticketController.show);
router.post('/tickets', ticketController.store);
router.delete('/ticket/:slug', ticketController.destroy);


// Update infos
router.patch('/ticket/accept', ticketController.updateAndAcceptSupport);
router.patch('/ticket/reopen', ticketController.updateAndReopen);
router.patch('/ticket/close', ticketController.updateAndClose);

// Messages
router.put('/messages', messageController.upload);

//Settings route
router.get('/settings', settingsController.index);

module.exports = router;
