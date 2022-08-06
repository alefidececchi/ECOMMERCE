const express = require('express')
const router = express.Router()

const { handleWebHook, payment } = require('../controllers/payment.controller.js')


router.post('/create-checkout-session', payment);
router.post('/webhook', handleWebHook);

module.exports = router