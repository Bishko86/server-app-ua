const nodemailer = require("../config/nodemailer.config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const {
  generateConfirmToken,
  generateAccessToken,
} = require("../helpers/generate-token");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { handleError } = require("../helpers/handle-error");
const userService = require("../services/user.service");

class AuthController {
  async registration(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return handleError(res, 400, "User with such name already exists");
      }

      const usermail = await User.findOne({ email });
      if (usermail) {
        return handleError(res, 400, "User with such email already exists");
      }

      const confirmEmailToken = generateConfirmToken(email);
      const salt = bcrypt.genSaltSync(7);
      const hashPassword = bcrypt.hashSync(password, salt);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        email,
        password: hashPassword,
        status: "Pending",
        confirmationCode: confirmEmailToken,
        roles: [userRole.value],
      });

      await user.save();
      nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
        confirmEmailToken
      );
      return res.json({
        message: "User was registered successfully! Please check your email",
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
