require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../../src/models/User.js");
const app = require("../../src/app.js");
const { MONGO_URI } = process.env;

let userId;

const user = {
  name: "testing",
  email: "test@email.com",
  password: "password",
};

describe("users", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get users route", () => {
    describe("given an unkwnown ID", () => {
      it("should return 500", async () => {
        const id = "1234";

        await supertest(app).get(`/users/${id}`).expect(500);
      });
    });

    describe("post users route", () => {
      describe("given nothing", () => {
        it("should return 400 and error", async () => {
          const { body, statusCode } = await supertest(app).post("/users");

          expect(statusCode).toBe(404);
        });
      });
    });

    describe("delete books route", () => {
      describe("given wrong ID", () => {
        it("should return 500 and error", async () => {
          const wrongId = "000";
          const { body, statusCode } = await supertest(app).delete(
            `/users/${wrongId}`
          );

          expect(statusCode).toBe(500);
        });
      });
    });
  });
});
