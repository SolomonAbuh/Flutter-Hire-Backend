const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  social: {
    provider: String,
    providerUserId: String,
    accessToken: String,
  },
});

module.exports = mongoose.model("User", userSchema);
