const express = require("express");
const UserRouter = require("./user.routes.js");
const BookRouter = require("./book.routes.js");
const AuthRouter = require("./auth.routes.js")
const { payment } = require('../controllers/payment.controller.js')

const router = express.Router();

// (ROUTES)
router.use("/users", UserRouter);
router.use("/books", BookRouter);
router.use("/auth", AuthRouter);
router.use("/api/checkout", payment)


module.exports = router;
