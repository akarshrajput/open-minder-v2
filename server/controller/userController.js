const User = require("./../models/userModel");
// const multer = require("multer");
// const sharp = require("sharp");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create Error if user is trying to change password
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message:
          "This route is not for password updates. Please use /updateMyPassword.",
      });
    }

    // 2) Filter out unwanted field names that are not allowed to be updated
    const filterBody = filterObj(
      req.body,
      "username",
      "name",
      "email",
      "phone",
      "bio",
      "passion"
    );
    // Saving image name to database
    // if (req.file) filterBody.photo = req.file.filename;

    // 3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updateUser,
      },
    });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);

      return res.status(400).json({
        status: "fail",
        message: `Validation error: ${errors.join(". ")}`,
      });
    }

    // Handle other types of errors
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Function to delete the user account by setting "active:false" in userSchema
exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
};
////

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Failed to find the users.",
      error: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found with the provided ID.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Failed to find the user.",
      error: err.message,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to create the user.",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to update the user.",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete the user.",
    });
  }
};
