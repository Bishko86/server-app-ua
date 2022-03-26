const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api.error");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");
const mailService = require("../services/mail.service");

class UserService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("There is no such user");
      throw ApiError.BadRequest("There is no such user");
    }
    if (user.status === "Pending") {
      console.log("Please verificate your email");
      throw ApiError.BadRequest("Please verificate your email");
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      console.log("Wrong password");
      throw ApiError.BadRequest("Wrong password");
    }
    const userDto = {
      username: user.username,
      email: user.email,
      status: user.status,
      roles: user.roles,
      id: user._id,
    };
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async registration(email, password, username = "") {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with such ${email} alredy exists`);
    }

    const userRole = await Role.findOne({ value: "USER" });
    const hashPassword = await bcrypt.hash(password, 3);
    const confirmationCode = uuidv4();

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      confirmationCode,
      roles: [userRole.value],
    });

    await mailService.sendActivationEmail(
      email,
      `${process.env.CLIENT_URL}/api/activate/${confirmationCode}`
    );

    const userDto = new UserDto(user);
    return userDto;
  }
}

module.exports = new UserService();
