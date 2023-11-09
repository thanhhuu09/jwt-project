const User = require("../models/User");

const userController = {
  // [GET] /user
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [DELETE] /users/:id
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted." });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
