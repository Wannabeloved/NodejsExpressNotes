const User = require("./models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const res = await User.create({ email, password: passwordHash });
  return res;
}

async function loginUser(email, password) {
  const userFromDB = await User.findOne({ email });
  if (!userFromDB) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, userFromDB.password);
  return isValid;
}

module.exports = { addUser, loginUser };
