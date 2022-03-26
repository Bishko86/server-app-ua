const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Active"], default: "Pending"},
  confirmationCode: { type: String, unique: true },
  roles: [{ type: String, ref: "Role" }],
});

module.exports = model("User", User);
