const nodemailer = require("../config/nodemailer.config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateConfirmToken, generateAccessToken} = require("../helpers/generate-token");
const User = require("../models/User");
const Role = require("../models/Role");
const { handleError } = require("../helpers/handle-error");

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleError(res, 400, errors.errors[0].msg)
      }

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
      handleError(res, 400, "Something went wrong");
    }
  }

  async login(req, res) {
    try {
      console.log("BODY",req.body);
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return handleError(res, 400, `User ${username} is not found`);
      }

      if (user.status !== "Active") {
        return handleError(res, 401, "Pending Account. Please Verify Your Email!");
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return handleError(res, 400, "Password is wrong");
      }

      const accessToken = generateAccessToken(user._id, user.roles);
      return res.json({
        accessToken,
        username: user.username,
        roles: user.roles,
      });
    } catch (err) {
      handleError(res, 400, "Something went wrong. Please, refresh your page");
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

  async verifyUser(req, res) {
    try {
      const confirmationCode = req.params.confirmationCode
      const user = await User.findOne({ confirmationCode });
      if(!user) {
        return handleError(res, 400, "Something went wrong. Please, refresh your page");
      }
      
      user.status = "Active";
      await user.save((err)=>{
        if(err) { return handleError(res, 500, err.message)}
      });
      return res.json({
        status: true,
        title: "Email successfully verified.",
        message: "Now you can go to login page."
      });
    } catch (error) {
      return handleError(res, 400, "Something went wrong. Please, refresh your page");
    }
  }
}

module.exports = new AuthController();
