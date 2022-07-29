const Stripe = require('stripe')
const stripe = Stripe(STRIPE_API_KEY_SECRET)

const payment = async (req, res) => {

    
    try {
        const line_items = req.body.carItems.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        metadata: {
                            id: item._id
                        }
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.cartQuantity}})

                const session = await stripe.checkout.sessions.create({
                    line_items,
                    mode: "payment",
                    succes_url: `${process.env.CLIENT_URL}/checkout-success`,
                    cancel_url: `${process.env.CLIENT_URL}/cart`,
                })

    } catch (error) {
        // console.log(error)
        res.json({ error: error.raw.message })
    }
    res.send('received')
}

module.exports = {
    payment
}