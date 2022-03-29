const User = require("../models/user.model");
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
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 15 * 86400000,
        httpOnly: true,
      });
      const { user, accessToken } = userData;
      return res.status(200).json({ user, accessToken });
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
      const userStatus = await userService.verifyUser(confirmationCode);

      return res.json({
        status: userStatus,
        title: "Email successfully verified.",
        message: "Now you can go to login page.",
      });
    } catch (error) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 15 * 86400000,
        httpOnly: true,
      });
      const { user, accessToken } = userData;
      return res.status(200).json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
