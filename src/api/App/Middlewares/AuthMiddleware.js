class AuthMiddleware {

    checkAuthentication (request) {
        let headersAuth = request.headers.authorization;

        if(!headersAuth) {
            return response.status(401).send({
                error: 'No token provided'
            });
        }

        const parts = headersAuth.split(' ');

        if(parts.length !== 2){
            return response.status(401).json({
                error: 'Token error'
            })
        }
    }
}

module.exports = AuthMiddleware;
