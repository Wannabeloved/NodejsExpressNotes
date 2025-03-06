const User = require("./models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const res = await User.create({ email, password: passwordHash });
  return res;
}

module.exports = { addUser };
