const express = require('express')
const router = express.Router()
const Order = require('../models/Order.js')
const stripe = require('stripe')(process.env.STRIPE_KEY)
// const stripe = Stripe(process.env.STRIPE_KEY)
const bodyParser = express

const { payment } = require('../controllers/payment.controller.js')
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_fed398dada1d21ce954d415fdcb14ac8a7050cabcb03edaa11c335f6867c005e";
router.use('/webhook', bodyParser.raw({type: "*/*"}))

router.post('/create-checkout-session', payment);

//create Order DB

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  try {
    await Order.create({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: Items,
      total_price: data.amount_total,
      payment_status: data.payment_status
    })

    // email
  } catch (error) {
    console.log(error)
  }
}


//STRIPE WEBHOOK




router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;

  if (endpointSecret) {
    let event
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Webhook verified")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      response.status(400).send(`hello: ${err.message}`);
      return;
    }
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data)
      })
      .catch((err) => console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});






module.exports = router