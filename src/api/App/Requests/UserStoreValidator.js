'use strict';


class UserStoreValidator {


    constructor(request)
    {
        this.validator(request)
    }

    validator(request)
    {

    }

    async rules()
    {
        return {
            'username' : 'required|string|unique',
            'email' : 'required|string|unique',
            'password' : 'required|string|confirmed',
        }
    }

}
