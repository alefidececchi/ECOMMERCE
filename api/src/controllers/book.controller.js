const Book = require("../models/Book.js");
const User = require("../models/User.js");
const {
  paginate,
  sortNames,
  sortPrices,
  sortReleased,
  sortDiscount,
  getByStatus,
  getByLanguage,
  getByName,
  getByGenre,
} = require("../lib/book.controller.helper.js");

const getBooks = async (req, res) => {
  const { name } = req.query;
  //sort is a string (asc / desc)
  const { sort } = req.query;
  //released is a string (asc / desc)
  const { released } = req.query;
  //released is a string (asc / desc)
  const { price } = req.query;
  //discount is a string (asc/desc)
  const { discount } = req.query;
  //status is a string (true/false)
  const { status } = req.query;
  //language is a string (language(en, es, fr, ...))
  const { language } = req.query;
  //genre is a string (genre(fictino, horror, history, ...))
  const { genre } = req.query;

  const { limit, page } = req.query;

  try {
    let books = await Book.find();
    if (sort) books = sortNames({ books, sort });
    if (price) books = sortPrices({ books, price });
    if (released) books = sortReleased({ books, released });
    if (discount) books = sortDiscount({ books, discount });
    if (status) books = getByStatus({ books, status });
    if (language) books = getByLanguage({ books, language });
    if (name) books = getByName({ books, name });
    if (genre) books = getByGenre({ books, genre });

    return res.status(200).json(paginate({ limit, page, books }));
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate(
      "sellers",
      "-_id -__v -selling_books -wish_list"
    );
    return res.status(200).json({ book: book });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getGenresBook = (req, res) => {
  const genres = [
    "autobiography",
    "fantasy",
    "fiction",
    "history",
    "horror",
    "science",
    "terror",
    "thriller",
  ];
  try {
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const postBook = async (req, res) => {
  const book = req.body;
  console.log(book);
  try {
    const bookAdded = await Book.create(book);
    // return res.status(201).json({ bookCreated: bookCreated });
    return res.status(201).json({ bookAdded: "book added" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const putBook = async (req, res) => {
  const { idBook } = req.params;
  const { idUser } = req.params;
  const book = req.body;
  if (!idUser) {
    try {
      const bookUpdated = await Book.updateOne({ _id: idBook }, { $set: book });
      return res.status(201).json({ bookUpdated: bookUpdated });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else {
    try {
      const bookUpdated = await Book.findByIdAndUpdate(
        idBook,
        { $push: { sellers: idUser } },
        { new: true, useFindAndModify: false }
      );
      return res.status(201).json({ bookUpdated: bookUpdated });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const bookDeleted = await Book.deleteOne({ _id: id });
    return res.status(201).json({ bookDeleted: bookDeleted });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getBooks,
  getGenresBook,
  postBook,
  getBookById,
  putBook,
  deleteBook,
};
