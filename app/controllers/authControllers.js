const nodemailer = require("../config/nodemailer.config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateConfirmToken } = require("../helpers/generate-token")
const User = require("../models/User");
const Role = require("../models/Role");
const { response } = require("../helpers/send-response");

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      console.log('4444');
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors?.errors[0].msg,
          errors,
        });
      }
      const { username, password, email } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return response(res, 400, "User with such name already exists");
      }
      console.log('33333');
      const usermail = await User.findOne({ email });

      if (usermail) {
        return response(res, 400, "User with such email already exists");
      }
      console.log('22222');
      const confirmEmailToken = generateConfirmToken(email);
      console.log('1111');

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
      response(res, 400, "Something went wrong");
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return response(res, 400, `User ${username} is not found`);
      }

      if (!user.status !== "Active") {
        return response(res, 401, "Pending Account. Please Verify Your Email!");
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return response(res, 400, "Password is wrong");
      }

      const accessToken = generateAccessToken(user._id, user.roles);

      return res.json({
        accessToken,
        username: user.username,
        roles: user.roles,
      });
    } catch (err) {
      response(res, 400, "Something went wrong. Please, refresh your page")
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

module.exports = new AuthController();
