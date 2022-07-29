const express = require('express')
const router = express.Router()

const { payment } = require('../controllers/payment.controller.js')

router.post('/', payment);


module.exports = router