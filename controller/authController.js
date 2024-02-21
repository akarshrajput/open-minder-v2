const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Send token via cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true, // Cookie will only be sent over https(set it to true in production mode)
    httpOnly: true, // Cookie will not be access or modified by Browser
  };
  res.cookie("jwt", token, cookieOptions);

  // Hide Password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
      role: req.body.role,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    return res.status(400).json({
      status: "error",
      message: "Please provide Username",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "Please provide Password",
    });
  }

  const user = await User.findOne({ username }).select("+password"); // We use("+password") to include password because we have disable password in userModel.js using select:false

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect Email or Password",
    });
  }
  createSendToken(user, 200, res);
};
