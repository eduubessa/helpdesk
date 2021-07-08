const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.replace("Bearer", "");
        const decoded = jwt.verify(token, "secret");
        next();
    }catch(err){
        return response.status(401).json({
            err: "Authentication failed"
        })
    }
};
