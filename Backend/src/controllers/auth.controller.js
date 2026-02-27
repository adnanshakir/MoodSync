const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const brycpt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "User already exits with this username or email",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = userModel({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered succesfully!",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
}

module.exports = {
  registerUser,
};
