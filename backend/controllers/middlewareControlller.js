const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    // Get token from header
    const token = req.headers["authorization"];
    // Check if token exists
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
      });
    }

    // If token doesn't exist
    else {
      res.status(401).json({ message: "You are not authenticated" });
    }
  },
};

module.exports = middlewareController;
