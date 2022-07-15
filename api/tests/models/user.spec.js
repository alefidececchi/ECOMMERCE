const dbConnection = require("../../src/database.js");
const User = require("../../src/models/User.js");
const { expect } = require("chai");

describe("User model", () => {
  before(() => {
    try {
      dbConnection();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  describe("Testing name", () => {
    
  })
});
