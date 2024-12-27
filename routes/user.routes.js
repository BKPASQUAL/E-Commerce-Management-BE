const express = require("express");
const { registerUser, loginUser, getAllUsers, getUserCount } = require("../controller/user.controller");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/userCount", getUserCount);

module.exports = router;
