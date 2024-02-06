const handleError = require("../helpers/handle-error");
const Friend = require("../models/friend.model");

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
  const friend = new Friend({ ...(req.body || {}) });

  friend.save((error, result) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json({ message: "User successfully saved", result });
    }
  });
};

const deleteFriend = (req, res) => {
  const id = req.params.id;

  Friend.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: 'Record removed'});
    })
    .catch((err) => res.status(404).json({ message: "Not found" }));
}

module.exports = {
  getFriend,
  getFriends,
  addFriend,
  deleteFriend,
};
