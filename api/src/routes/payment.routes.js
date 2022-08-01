const express = require('express')
const router = express.Router()

const { payment } = require('../controllers/payment.controller.js')

router.post('/create-checkout-session', payment);



//STRIPE WEBHOOK



// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_589c8a4742cefef3fe36e18f0a2d9f7fabb41d23c3b86f32832e6842360d7eea";

// router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     console.log("Webhook verified")
//   } catch (err) {
//     console.log(`Webhook Error: ${err.message}`)
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
  

//   // Return a 200 response to acknowledge receipt of the event
//   response.send().end();
// });






module.exports = router