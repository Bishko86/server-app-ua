const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api.error');
const secret = process.env.SECRET;

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw ApiError.UnauthorizedError();
      }

      const {roles: userRoles} = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach(role => hasRole = roles.includes(role));
      if(!hasRole) {
        throw ApiError.NoRights();
      }

      next();
    } catch (error) {
      throw ApiError.UnauthorizedError();
    }
  };
};
