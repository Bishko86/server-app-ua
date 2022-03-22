const handleError = require("../helpers/handle-error");
const Friend = require("../models/Friend");

const getFriends = (req, res) => {
  Friend.find()
    .then((friends) => {
      res.status(200).json(friends);
    })
    .catch((err) =>
      handleError(res, 400, "Something went wrong. Please refresh page")
    );
};

const getFriend = (req, res) => {
  const id = req.params.id;
  Friend.findById(id)
    .then((friend) => {
      res.status(200).json(friend);
    })
    .catch((err) => res.status(404).json({ message: "Not found" }));
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
