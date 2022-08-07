const express = require("express")
const {} = require("../controllers/order.controller.js")

const { isAdmin } = require("../middlewares/auth.middleware")

//router.get("/order", isAdmin, getStats)