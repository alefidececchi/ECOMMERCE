require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");
const Book = require("../../src/models/Book.js");
const app = require("../../src/app.js");
const { MONGO_URI } = process.env;

let bookId;

const book = {
  name: "testing name",
  image: "testing image",
  genres: ["testing genre"],
  description: "testing description",
  price: 999,
  used: false,
  released: "00-00-0000",
  stock: 1,
};

describe("books", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get books route", () => {
    describe("given an unknown ID", () => {
      it("should return 500", async () => {
        const id = "1234";

        await supertest(app).get(`/books/${id}`).expect(500);
      });
    });

    describe("given a known ID", () => {
      it("should return 200 and the book", async () => {
        const id = "62dac8d5e96b6437a8785a6a";

        const { body, statusCode } = await supertest(app).get(`/books/${id}`);

        expect(statusCode).toBe(200);
        expect(body.book._id).toBe(id);
        expect(body.book.name).toBe("Cuentos Del Terror / Tales of Terror");
        expect(body.book.released).toBe("1997-01-01");
      });
    });

    describe("given book name", () => {
      it("should return 200 and the book", async () => {
        const name = "Shockaholic";
        const id = "62dac965d121c1cc93b75b32";
        const released = "2012-11-13";
        const pageCount = 176;
        const language = "en";

        const { body, statusCode } = await supertest(app).get(
          `/books?name=${name}`
        );
        expect(statusCode).toBe(200);
        expect(body.books[0].name).toBe(name);
        expect(body.books[0]._id).toBe(id);
        expect(body.books[0].released).toBe(released);
        expect(body.books[0].pageCount).toBe(pageCount);
        expect(body.books[0].language).toBe(language);
      });
    });
  });

  describe("post books route", () => {
    describe("given nothing", () => {
      it("should return 400 and error", async () => {
        const { body, statusCode } = await supertest(app).post("/books");

        expect(statusCode).toBe(500);
        expect(body.error.message).toBe(
          "Book validation failed: stock: Path `stock` is required., released: Path `released` is required., used: Path `used` is required., price: Path `price` is required., description: Path `description` is required., image: Path `image` is required., name: Path `name` is required."
        );
      });
    });

    describe("given a book create it", () => {
      it("should return 201 and the book", async () => {
        const { body, statusCode } = await supertest(app)
          .post("/books")
          .send(book);

        expect(statusCode).toBe(201);
        expect(body.bookAdded).toBe("book added");
      });
    });
  });

  describe("given a name get the book", () => {
    it("should return 200 and the book", async () => {
      const { body, statusCode } = await supertest(app).get(
        `/books?name=${book.name}`
      );

      bookId = body.books[0]._id;

      expect(statusCode).toBe(200);
    });
  });

  describe("put books route", () => {
    describe("given wrong book ID", () => {
      it("should return 500 and error", async () => {
        const wrongId = "1234";
        const { statusCode, body } = await supertest(app).put(
          `/books/${wrongId}`
        );
        expect(statusCode).toBe(500);
        expect(body.error.message).toBe(
          'Cast to ObjectId failed for value "1234" (type string) at path "_id" for model "Book"'
        );
      });
    });

    describe("given new price and stock these will be modified", () => {
      it("should return 201 and the modified book", async () => {
        const newData = {
          price: 200,
          stock: 10,
        };
        const { statusCode, body } = await supertest(app)
          .put(`/books/${bookId}`)
          .send(newData);

        expect(statusCode).toBe(201);
        expect(body.bookUpdated.acknowledged).toBe(true);
      });
    });
  });

  describe("delete books route", () => {
    describe("given wrong ID", () => {
      it("should return 500 and error", async () => {
        const wrongId = "000";
        const { body, statusCode } = await supertest(app).delete(
          `/books/${wrongId}`
        );

        expect(statusCode).toBe(500);
      });
    });

    describe("given a right ID", () => {
      it("should return 201 and message", async () => {
        const { body, statusCode } = await supertest(app).del(
          `/books/${bookId}`
        );
        expect(statusCode).toBe(201);
      });
    });
  });
});
