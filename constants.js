const JWT_SECRET = process.env.JWT_SECRET || "secret";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

module.exports = { JWT_SECRET, SALT_ROUNDS };
