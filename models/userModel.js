const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
    maxlength: [40, "Name must not have more than 40 characters."],
  },
  username: {
    type: String,
    unique: [true, "Username already exist."],
    required: [true, "Please provide your username."],
    minlength: [5, "Username must have more than 5 characters."],
    maxlength: [20, "Username must have less than 20 characters."],
    lowercase: [true, "Username must have lowercase characters."],
  },
  email: {
    type: String,
    unique: [true, "Email already exist."],
    required: [true, "Please provide your email."],
    lowercase: [true, "Email must have lowercase characters."],
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number is not valid [exceeding more than limit]."],
    validate: [validator.isMobilePhone, "Please provide a valid Phone Number."],
  },
  passion: {
    type: String,
    default: "Not defined",
  },
  bio: {
    type: String,
    maxlength: [100, "Bio must have less than 100 characters."],
    default: "Hi there 👋",
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, // It will be saved to database but will never appear for get request
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.correctPassword = async function (candidatePassword) {
  return (await candidatePassword) === this.password;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
