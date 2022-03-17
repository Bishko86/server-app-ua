const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const { response } = require('../helpers/send-response');

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return response(res, 403, "User is not authorized");
      }

      const {roles: userRoles} = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach(role => hasRole = roles.includes(role));
      if(!hasRole) {
          return response(res, 403, "You don't have access");
      }

      next(); // call next middleware
    } catch (error) {
      response(res, 403, "User is not authorized");
    }
  };
};
