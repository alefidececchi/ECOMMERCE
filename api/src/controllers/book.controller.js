const Book = require("../models/Book.js");
const User = require("../models/User.js");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const postBook = async (req, res) => {
  const book = req.body;
  console.log(book)
  try {
    const bookCreated = await Book.create(book);
    return res.status(201).json({ bookCreated: bookCreated });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getBooks,
  postBook,
};
