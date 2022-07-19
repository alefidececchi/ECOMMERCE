const express = require("express");
const UserRouter = require("./user.routes.js");

const router = express.Router();

// (ROUTES)
router.get("/", UserRouter);

module.exports = router;
