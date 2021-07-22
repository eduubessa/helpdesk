const express = require('express');
const router = express.Router();

//Requires
const TicketController = require('../App/Controllers/Api/TicketApiController');

//Instances
let ticketController = new TicketController();

router.get('/', (request, response) => {
    response.status(200).json({
       status: 200,
       message: `Welcome to API`
    });
});

router.get('/tickets', ticketController.index);

/* Errors routes */
router.get('/error/404', (request, response) => {
    response.status(404).json({
        error: 404,
        message: 'Error 404 - Page not found'
    })
});

module.exports = router;