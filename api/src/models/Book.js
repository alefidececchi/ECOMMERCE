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
    discount: {
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
      type:Number
    },
    language: {
      type:String
    },
    book_type: {
      type:String
    },
    sellers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    autor: [
      {
        type: Schema.Types.String,
        required: true
      }
    ],
    stock: {
      type: Number,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = model("Book", bookSchema);

