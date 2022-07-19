const express = require("express");
const { getBooks, postBook } = require("../controllers/book.controller.js");

const router = express.Router();

//(GET)-/books/
router.get("/", getBooks);

//(POST)-/books/
router.post("/", postBook);

module.exports = router;
