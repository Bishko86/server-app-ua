const ApiError = require("../exceptions/api.error");
const handleError = require("../helpers/handle-error");
const Friend = require("../models/friend.model");

const getFriends = (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('Cookies from client',refreshToken);
  Friend.find()
    .then((friends) => {
      res.status(200).json(friends);
    })
    .catch((err) => {
      throw ApiError.BadRequest(
        "Something went wrong. Please refresh page"
      );
    });
};

const getFriend = (req, res) => {
  const id = req.params.id;
  Friend.findById(id)
    .then((friend) => {
      res.cookie("bishkoRoman", "accessToken", {
        maxAge: 900000,
        httpOnly: true,
      });
      res.status(200).json(friend);
    })
    .catch((err) => {
      throw ApiError.BadRequest("Not found");
    });
};

const addFriend = (req, res) => {
  const user = req.body.user;
  const friend = new Friend({ ...user });

  friend.save((error, result) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json({ message: "User successfully saved", result });
    }
  });
};

module.exports = {
  getFriend,
  getFriends,
  addFriend,
};
