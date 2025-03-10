const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, SALT_ROUNDS } = require("./constants");

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const res = await User.create({ email, password: passwordHash });
  return res;
}

async function loginUser(email, password) {
  const userFromDB = await User.findOne({ email });
  if (!userFromDB) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, userFromDB.password);
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { addUser, loginUser };
