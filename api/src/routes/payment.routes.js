const express = require('express')
const router = express.Router()

const { payment } = require('../controllers/payment.controller.js')

router.post('/create-checkout-session', payment);


module.exports = router