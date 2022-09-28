const { User, validateUserSignUp } = require("../model/user");
const bcrypt = require("bcrypt");
require("express-async-errors");

const getUserList = async (req, res) => {
  const { user_name } = req.body;
  const user = await User.find({
    user_name: { $regex: user_name, $options: "$i" },
  }).select("-__v");
  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.status(200).json({ user });
};

const createUser = async (req, res) => {
  console.log("salom");
  const { user_name } = req.body;
  let user = await new User({ user_name });
  user.save();
  return res.status(200).json({ user });
};

const loginUser = async (req, res) => {
  const { user_name } = req.body;
  console.log(user_name);
  let user = await User.findOne({ user_name: user_name });
  if (!user) {
    return res.status(404).json({ error: "user does not exist" });
  }
  console.log(user);
  let token = await user.generateAccessToken();
  return res.status(200).json({ token, user });
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

exports.getUserList = getUserList;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUserById = getUserById;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
