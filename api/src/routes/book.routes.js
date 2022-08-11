const express = require("express");
const {
  getBooks,
  postBook,
  getBooksinOffers,
  getBookById,
  getGenresBook,
  putCommentBook,
  putBook,
  deleteBook,
} = require("../controllers/book.controller.js");
const {verifyToken}=require("../middlewares/auth.middleware.js")

const router = express.Router();

//(GET) - books/genres
router.get("/genres", getGenresBook);




//(GET)-/books/
router.get("/",getBooks);

// router.get("/",[verifyToken],getBooks);

//(GET)- /books/offers
router.get('/offers',getBooksinOffers);

//(GET)-/books/:id
router.get("/:id", getBookById);



//(POST)-/books/ (MODE API)
router.post("/", postBook);

//(POST)-/books/:idUser (CREATE AND RELATIONSHIP)
router.post("/:idUser", postBook);

//(PUT)-books/:id/:id
router.put("/:idBook/:idUser", putCommentBook);

//(PUT)-books/:id
router.put("/:idBook/", putBook);



//(DELETE)-books/:id
router.delete("/:idBook", deleteBook);

//(DELETE)-books/:id (DELETE RELATIONSHIPS)
router.delete("/:idBook/:idUser", deleteBook);

module.exports = router;
