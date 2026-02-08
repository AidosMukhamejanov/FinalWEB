const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();
  res.json({ message: "Profile updated successfully", user: { username: user.username, email: user.email } });
};
