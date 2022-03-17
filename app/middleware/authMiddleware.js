const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const { response } = require('../helpers/send-response');

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return response(res, 403, "User is not authorized");
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next()// call next middleware
        
    } catch (error) {
        response(res, 403, "User is not authorized");
    }
}