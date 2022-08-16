const express = require("express");
const UserRouter = require("./user.routes.js");
const BookRouter = require("./book.routes.js");
const AuthRouter = require("./auth.routes.js")
const PaymentRouter = require('./payment.routes.js')
const OrderRouter = require('./order.routes.js')

const router = express.Router();

// (ROUTES)
router.use("/users", UserRouter);
router.use("/books", BookRouter);
router.use("/auth", AuthRouter);
router.use("/api/stripe", PaymentRouter)
router.use("/orders", OrderRouter);
router.use("*/*", (req, res) => {
    try {
        res.status(404).send(`The page doesn't exists`)
    } catch (error) {
        res.status(404).send(`The page doesn't exists`)
    }
})

module.exports = router;
