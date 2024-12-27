const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controller/user.controller");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

module.exports = router;
