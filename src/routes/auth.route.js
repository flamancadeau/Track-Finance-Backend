const express = require("express");
const { register, login, getRegister, getAllRegisters } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.get("/register/:id", getRegister)

router.post("/login", login);
router.get("/Register", getAllRegisters);

module.exports = router;