const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    admin: {
      types: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "default_image",
    },
    description: {
      type: String,
    },
    country: {
      type: String,
    },
    selling_books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    purchased_books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    wish_list: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
