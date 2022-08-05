require("dotenv").config();
const express = require('express')
const router = express.Router()
const Order = require('../models/Order.js')
const stripe = require('stripe')('sk_test_51LQc6YAPkp4roCySdW6xafR8dve0jqZLjceZ59Gyzdmmw8tYW2RjvNcZmf9piESYYVkKB4fyd38d9Ss7TdjI55nP0076RqF47n')
// const stripe = Stripe(process.env.STRIPE_KEY)
const bodyParser = require('body-parser')

const { payment } = require('../controllers/payment.controller.js')
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_fed398dada1d21ce954d415fdcb14ac8a7050cabcb03edaa11c335f6867c005e";
// router.use('/webhook', )

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




router.post('/webhook', async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  let data;
  let eventType;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
      console.log("Webhook verified")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      response.status(400).send(`hello: ${err.message}`);
      return;
    }
    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  try {
    if (eventType === "checkout.session.completed") {
      const customer = await stripe.customers.retrieve(data.customer)
      console.log('customer: ', customer)
      // createOrder(customer, data) 

    }
  } catch (err) {
    console.log(err.message)
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send().end();
});






module.exports = router