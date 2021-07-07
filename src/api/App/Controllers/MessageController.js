'use strict';

class MessageController {

    async index(request, response, next)
    {

    }

    async show(request, response, next)
    {

    }

    /**
     * Upload files to message
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<*>}
     */
    async upload(request, response, next)
    {
        return response.status(200).send("Podes fazer download");
    }

}

module.exports = MessageController;