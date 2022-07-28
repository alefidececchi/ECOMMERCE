const express = require("express");
const {
  getUsers,
  getUserByID,
  postUser,
  putUser,
  putUserBook,
  deleteUser,
  putUserWishList
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", getUsers);

router.get("/:idUser", getUserByID);

router.post("/register", postUser);

router.put("/:idUser", putUser);

router.put("/:idUser/:idBook", putUserBook);

router.put("/add/:idUser/:idBook", putUserWishList)

router.delete("/:idUser", deleteUser);

module.exports = router;
