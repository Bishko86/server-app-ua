const bcrypt = require("bcryptjs/dist/bcrypt");
const ApiError = require("../exceptions/api.error");
const User = require("../models/user.model");
const tokenService = require("./token.service");

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
}

module.exports = new UserService();
