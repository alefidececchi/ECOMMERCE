const express = require("express");
const {
  getUsers,
  getUserByID,
  postUserGoogle,
  putUser,
  putUserBook,
  deleteUser,
  putUserWishList,
  getStats
} = require("../controllers/user.controller.js");

const { isAdmin } = require("../middlewares/auth.middleware")

const router = express.Router();

router.get("/", getUsers);

router.get("/stats", getStats)
//router.get("/stats", isAdmin, getStats)

router.get("/:idUser", getUserByID);

router.post("/registerGoogle", postUserGoogle);

router.put("/:idUser", putUser);

router.put("/:idUser/:idBook", putUserBook);


router.put("/add/:idUser/:idBook", putUserWishList)

router.delete("/:idUser", deleteUser);




module.exports = router;
