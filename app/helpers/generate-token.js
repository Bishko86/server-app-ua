const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
module.exports = {
  generateAccessToken: (id, roles) => {
    return jwt.sign({ id, roles }, secret, { expiresIn: "24h" });
  },
  generateConfirmToken: (email) => {
    return jwt.sign({ email }, secret, { expiresIn: "1h" });
  },
};
