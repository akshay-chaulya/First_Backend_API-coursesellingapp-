const jwt = require("jsonwebtoken");

const { JWT_PSSWORD } = require("../config.js");
const { User } = require("../db/index.js");

// Middleware for handling auth
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB.
  // Check readme for the exact headers to be expected
  try {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({ msg: "empty token" });
    const jwtToken = token.split(" ")[1];
    const { email } = jwt.verify(jwtToken, JWT_PSSWORD);
    const exist = await User.findOne({ email });
    if (exist) {
      req.email = email;
      next();
    } else {
      res.status(403).json({ msg: "You are not authenticated" });
    }
  } catch (err) {
    if (err) res.status(403).json({ msg: "invalid token or type" });
  }
}

module.exports = userMiddleware;
