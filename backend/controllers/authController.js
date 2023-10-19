const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        res.status(400).json({ message: "Wrong username or password." });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        res.status(400).json({ message: "Wrong username or password." });
      }
      if (user && passwordMatch) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
