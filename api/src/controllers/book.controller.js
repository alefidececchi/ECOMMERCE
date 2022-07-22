const Book = require("../models/Book.js");
const User = require("../models/User.js");

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
  const { limit, page } = req.query;

  if (sort === "asc") {
    try {
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", name: 1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", name: 1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (sort === "desc") {
    try {
      // const books = await Book.find();
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", name: -1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", name: -1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (released === "desc") {
    try {
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", released: 1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", released: 1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (released === "asc") {
    try {
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", released: -1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", released: -1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (price === "desc") {
    try {
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", price: 1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", price: 1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (price === "asc") {
    try {
      // const books = await Book.find();
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", price: -1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", price: -1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (discount === "desc") {
    try {
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", discount: 1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "asc", discount: 1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (discount === "asc") {
    try {
      // const books = await Book.find();
      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", discount: -1 })
        : await Book.find()
            .limit(limit)
            .skip(limit * page)
            .sort({ field: "desc", discount: -1 });

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (status === "true") {
    try {
      const books = await Book.find({ used: true });
      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (status === "false") {
    try {
      const books = await Book.find({ used: false });
      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else if (language) {
    try {
      const books = await Book.find({ language: language });
      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else {
    try {
      // const books = await Book.find();

      const books = name
        ? await Book.find({ name: { $regex: "^" + name, $options: "i" } })
            .limit(limit)
            .skip(limit * page)
        : await Book.find()
            .limit(limit)
            .skip(limit * page);

      return res.status(200).json({ books: books });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
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
    return res.status(400).json({ genres });
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
