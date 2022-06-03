const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5 },
  })
);

module.exports = User;
