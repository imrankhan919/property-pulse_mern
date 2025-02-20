const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!!!");
  }

  // Check if user already exist
  const emailExist = await User.findOne({ email: email });
  const phoneExist = await User.findOne({ phone: phone });

  if (emailExist || phoneExist) {
    res.status(400);
    throw new Error("User already exist!");
  }

  // Hash Password
  const salt = bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("User Not Created!!");
  }

  res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!!!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

module.exports = { registerUser, loginUser };
