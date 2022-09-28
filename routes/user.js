const express = require("express");
const {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
} = require("../controller/userController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/login", loginUser);
router.post("/sign-up", createUser);
router.use(authenticateToken);
router.post("/list", getUserList);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
