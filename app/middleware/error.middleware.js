const ApiError = require("../exceptions/api.error");

module.exports = (err, req, res, next) => {
  console.log("ERROR:", err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unknown error", err });
};
