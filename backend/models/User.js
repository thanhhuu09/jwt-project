const mongoose = require("mongoose");

// Schema of user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username."],
      unique: true,
      minLength: [6, "Username must be at least 6 characters."],
      maxLength: [20, "Username must be at most 20 characters."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
      minLength: [10, "Email must be at least 10 characters."],
      maxLength: [50, "Email must be at most 50 characters."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [6, "Password must be at least 6 characters."],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
