const jwt = require("jsonwebtoken");

const { JWT_PSSWORD } = require("../config.js");
const { Admin } = require("../db/index.js");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB.
  // Check readme for the exact headers to be expected
  try {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({ msg: "empty token" });
    const jwtToken = token.split(" ")[1];
    const { email } = jwt.verify(jwtToken, JWT_PSSWORD);
    const exist = await Admin.findOne({ email });
    if (exist) next();
    else res.status(403).json({ msg: "You are not authenticated" });
  } catch (err) {
    if (err) res.status(403).json({ msg: "invalid token or type" });
  }
}

module.exports = adminMiddleware;
