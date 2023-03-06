const mongoose = require("mongoose");

const Item = new mongoose.model(
  "Item",
  new mongoose.Schema(
    {
      name: { type: String, max: 100, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      sponsored: { type: Boolean, required: true },
      image: { data: Buffer, contentType: String },
      rating: { type: Number, required: true },
      description: { type: String, max: 500, required: true },
      link: { type: String, required: true },
    },
    { timestamps: true }
  )
);

module.exports = Item;
