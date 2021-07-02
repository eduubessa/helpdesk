const express = require('express');
const router = express.Router();

//Requires
const UserController = require('../App/Controllers/UserController');
const TicketController = require('../App/Controllers/TicketController');
const AuthController = require('../App/Controllers/Auth/LoginController');
const RegisterController = require('../App/Controllers/Auth/RegisterController');
const SettingsController = require('../App/Controllers/SettingsController');

//Instances
let authController = new AuthController();
let registerController = new RegisterController();
let userController = new UserController();
let ticketController = new TicketController();
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
router.post('/tickets', ticketController.store);

//Settings route
router.get('/settings', settingsController.index);



module.exports = router;
