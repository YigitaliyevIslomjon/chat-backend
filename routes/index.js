const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const userRoute = require("./user");
const messageRoute = require("./message");
router.use("/user", userRoute);
router.use(authenticateToken);
router.use("/message", messageRoute);

module.exports = router;
