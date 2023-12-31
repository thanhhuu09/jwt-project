const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      const user = await newUser.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      // Check if user exists
      if (!user) {
        return res.status(400).json({ message: "Wrong username or password." });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res.status(400).json({ message: "Wrong username or password." });
      }
      if (user && passwordMatch) {
        // Create jwt token
        const accessToken = jwt.sign(
          { id: user._id, admin: user.admin },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ user, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
