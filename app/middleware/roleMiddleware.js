const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const { handleError } = require('../helpers/handle-error');

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return handleError(res, 403, "User is not authorized");
      }

      const {roles: userRoles} = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach(role => hasRole = roles.includes(role));
      if(!hasRole) {
          return handleError(res, 403, "You don't have access");
      }

      next(); // call next middleware
    } catch (error) {
      handleError(res, 403, "User is not authorized");
    }
  };
};
