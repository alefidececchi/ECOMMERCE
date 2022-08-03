const { Schema, model } = require("mongoose");


const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: Schema.Types.String,
        required: true
      },
    ],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    PriceWithDiscount: {
      type: Number,
      default: 0,
    },
    used: {
      type: Boolean,
      required: true,
    },
    released: {
      type: String,
      required: true
    },
    pageCount: {
      type: Number
    },
    language: {
      type: String
    },
    book_type: {
      type: String
    },
    sellers: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        id_user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        score: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],
    authors: {
      type: Array,
      default: undefined
    },
    stock: {
      type: Number,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    inOffer: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = model("Book", bookSchema);

