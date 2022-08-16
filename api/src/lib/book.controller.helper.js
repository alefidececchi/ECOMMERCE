const paginate = ({ limit, page, books }) => {
  const indexLast = page * limit;
  const indexFirst = indexLast - limit;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / limit); i++) {
    pageNumbers.push(i);
  }

  const current = books.slice(indexFirst, indexLast);

  return { books: current, pages: pageNumbers[pageNumbers.length - 1] };
};

const sortNames = ({ books, sort }) => {
  if (sort === "AZ") {
    books = books.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }
  if (sort === "ZA") {
    books = books.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
  }
  if (sort === "lowest to highest") {
    books = books.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
  }
  if (sort === "highest to lowest") {
    books = books.sort((a, b) => {
      if (a.price < b.price) return 1;
      if (a.price > b.price) return -1;
      return 0;
    });
  }
  if (sort === "oldest") {
    books = books.sort((a, b) => {
      if (a.released > b.released) return 1;
      if (a.released < b.released) return -1;
      return 0;
    });
  }
  if (sort === "latest") {
    books = books.sort((a, b) => {
      if (a.released < b.released) return 1;
      if (a.released > b.released) return -1;
      return 0;
    });
  }
  return books;
};

const sortDiscount = ({ books, discount }) => {
  if (discount === "asc") {
    books = books.sort((a, b) => {
      if (a.discount > b.discount) return 1;
      if (a.discount < b.discount) return -1;
      return 0;
    });
  }
  if (discount === "desc") {
    books = books.sort((a, b) => {
      if (a.discount < b.discount) return 1;
      if (a.discount > b.discount) return -1;
      return 0;
    });
  }
  return books;
};

const getByStatus = ({ books, status }) => {
  if (status === "secondhand") books = books.filter((book) => book.used === true);
  if (status === "new") books = books.filter((book) => book.used === false);

  return books;
};

const getByLanguage = ({ books, language }) => {
  return books.filter((book) => book.language === language);
};

const getByName = ({ books, name }) => {
  return books.filter((book) =>
    book.name.toLowerCase().includes(name.toLowerCase())
  );
};

const getByGenre = ({ books, genre }) => {
  return books.filter((book) => book.genres.includes(genre));
};

const getByAuthor = ({ books, author }) => {
  return books.filter((book) => book.authors?.includes(author.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))))
};

const getByOffers = ({books})=>{
  books=books.filter((book)=>book.inOffer===true);
return books
}

module.exports = {
  paginate,
  sortNames,
  sortDiscount,
  getByStatus,
  getByLanguage,
  getByName,
  getByGenre,
  getByAuthor,
  getByOffers
};
