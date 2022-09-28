const express = require("express");
const {
  getMessageList,
  createMessage,
} = require("../controller/messageController");

const authenticateToken = require("../middleware/auth");
const router = express.Router();
router.get("/", getMessageList);
router.post("/", createMessage);

module.exports = router;
