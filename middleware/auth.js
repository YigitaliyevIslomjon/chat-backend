const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "Invalid token" });

  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ message: "unauthenticated" });
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;
