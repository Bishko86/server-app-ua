const { Schema, model } = require("mongoose");

const Friend = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  company: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
});

module.exports = model("Friend", Friend);
