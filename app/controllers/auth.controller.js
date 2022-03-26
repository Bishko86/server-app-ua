
const User = require("../models/user.model");
const { handleError } = require("../helpers/handle-error");
const userService = require("../services/user.service");

class AuthController {
  async registration(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const user = await userService.registration(email, password, username);
      return res.json({
        message: "User was registered successfully! Please check your email",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async verifyUser(req, res, next) {
    try {
      const confirmationCode = req.params.confirmationCode;
      const user = await User.findOne({ confirmationCode });
      if (!user) {
        return handleError(
          res,
          400,
          "Something went wrong. Please, refresh your page"
        );
      }

      user.status = "Active";
      await user.save((err) => {
        if (err) {
          return handleError(res, 500, err.message);
        }
      });
      return res.json({
        status: true,
        title: "Email successfully verified.",
        message: "Now you can go to login page.",
      });
    } catch (error) {
      next(err);
    }
  }
}

module.exports = new AuthController();
