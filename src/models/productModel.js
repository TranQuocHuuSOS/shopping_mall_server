const { default: mongoose } = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  discount_percentage: {
    type: Number
  },
  original_price: {
    type: Number,
    require: true
  },
  discounted_price: {
    type: Number
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
