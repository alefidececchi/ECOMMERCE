const express = require("express");
const {
  getUsers,
  getUserByID,
  postUserGoogle,
  putUser,
  putUserBook,
  deleteUser,
  purchasedBooks,
  putUserWishList,
  becomeAdmin
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", getUsers);

router.get("/:idUser", getUserByID);

router.post("/registerGoogle", postUserGoogle);

router.put("/admin", becomeAdmin)

router.put('/purchasing-books/:idUser',purchasedBooks);

router.put("/updatewishlist/:idUser", putUserWishList)

router.put("/:idUser/:idBook", putUserBook);

router.put("/:idUser", putUser);

router.delete("/:idUser", deleteUser);



module.exports = router;
