const userController = require("../controllers/userController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareControlller");
router.get("/", middlewareController.verifyToken, userController.getAllUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
