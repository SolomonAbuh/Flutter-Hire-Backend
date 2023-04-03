const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ["job_seeker", "employer"],
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
