const express = require("express");
const UserRouter = require("./user.routes.js");

const BooksRouter= require("./books.routes.js");

const router = express.Router();

// (ROUTES)
router.use("/users", UserRouter);
router.use("/books", BookRouter);


module.exports = router;
