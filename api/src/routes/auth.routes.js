const express = require("express");
const router = express.Router();
const {
    signUp,
    activateAccount,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/auth.controller.js")

router.post("/register", signUp)
router.post("/activate-account", activateAccount)
router.post("/login", login)
router.put("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)

module.exports = router