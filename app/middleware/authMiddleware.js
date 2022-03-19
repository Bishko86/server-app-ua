const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const { handleError } = require('../helpers/handle-error');

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return handleError(res, 403, "User is not authorized");
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next()// call next middleware
        
    } catch (error) {
        handleError(res, 403, "User is not authorized");
    }
}