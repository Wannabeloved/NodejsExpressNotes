const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

function auth(req, res, next) {
  const token = req.cookies.token;

  try {
    const verify = jwt.verify(token, JWT_SECRET);
    console.log(verify);
    req.user = {
      email: verify.email,
    };
    next();
  } catch (err) {
    res.redirect("/login");
  }
}
module.exports = auth;
