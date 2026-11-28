import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    enum: ["INR", "USD"],
    default: "INR",
    required: true,
  },
},

 images: {
  type: [String],
  required: true,
  validate: {
    validator: (value) => value.length >= 1 && value.length <= 5,
    message: "Images must contain between 1 and 5 URLs",
  },
},
category: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  enum: [
    "electronics",
    "fashion",
    "home",
    "sports",
    "beauty",
    "books"
  ]
},
variants: [
  {
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
],
seller :{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users',
  required:true
}
});


const productModel = mongoose.model("products", productSchema)
export default productModel