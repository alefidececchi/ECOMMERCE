const express = require("express");
const {
  getUsers,
  getUserByID,
  postUserGoogle,
  putUser,
  putUserBook,
  deleteUser,
  putUserWishList
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", getUsers);

router.get("/:idUser", getUserByID);

router.post("/registerGoogle", postUserGoogle);

router.put("/:idUser", putUser);

router.put("/:idUser/:idBook", putUserBook);

router.put("/add/:idUser/:idBook", putUserWishList)

router.delete("/:idUser", deleteUser);

module.exports = router;
