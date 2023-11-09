const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    // Get token from header
    const token = req.headers.authorization;
    // Check if token exists
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        // Set user in req.user
        req.user = user;
        next();
      });
    }

    // If token doesn't exist
    else {
      res.status(401).json({ message: "You are not authenticated" });
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    // Check if user is admin or match with the id
    middlewareController.verifyToken(req, res, () => {
      if (req.user.admin || req.user.id === req.params.id) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized" });
      }
    });
  },
};

module.exports = middlewareController;
