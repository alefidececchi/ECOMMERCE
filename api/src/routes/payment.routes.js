const express = require("express");
const router = express.Router();
const Order = require('../models/Order.js');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
const { handleWebHook } = require('../controllers/payment.controller.js')
const { payment } = require("../controllers/payment.controller.js");
const {
  paymentGiftCard,
} = require("../controllers/paymentGiftCard.controller");

router.post("/webhook", handleWebHook)
router.post("/create-checkout-session", payment);
router.post("/create-checkout-giftCardsession", paymentGiftCard);



// const createOrder = async (customer, data) => {
//   const Items = JSON.parse(customer.metadata.cart);

//   try {
//     const newOrder = await Order.create({
//       userId: customer.metadata.userId,
//       customerId: data.customer,
//       paymentIntentId: data.payment_intent,
//       products: Items,
//       total_price: data.amount_total,
//       payment_status: data.payment_status
//     })

//     // email
//   } catch (error) {
//     console.log(error)
//   }
// }





module.exports = router
