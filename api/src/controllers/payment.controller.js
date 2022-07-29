const { STRIPE_API_KEY_SECRET } = process.env
const stripe = require('stripe')(STRIPE_API_KEY_SECRET)

const payment = async (req, res) => {

    const { id, amount } = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: id,
            confirm: true
        })
        console.log(paymentIntent)
        res.json({ message: 'succesfull payment' })
    } catch (error) {
        // console.log(error)
        res.json({ error: error.raw.message })
    }
    res.send('received')
}

module.exports = {
    payment
}