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
  address: {
    street: {
      type: String,
    },
    suite: {
      type: Date,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    geo: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  company: {
    name: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
    bs: {
      type: String,
    },
  },
});

module.exports = model("Friend", Friend);
