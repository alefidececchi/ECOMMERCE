const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    stripeId: { type: String },
    products: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Book"
            },
            cartQuantity: { type: Number },
            desc: { type: String },
            image: { type: String },
            name: { type: String },
            price: { type: Number },
        }
    ],
    total_price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    delivery_status: { type: String, default: "pending" },
},
    {
        timestamps: true,
    }
)

module.exports = model("Order", orderSchema)