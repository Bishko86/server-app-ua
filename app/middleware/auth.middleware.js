const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api.error");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (error) {
    throw ApiError.UnauthorizedError();
  }
};
