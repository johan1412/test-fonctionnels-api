
const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  warranty_years: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  tags : [
    {type: mongoose.Schema.Types.ObjectId,ref:'Tag'}
]
})

module.exports = mongoose.model('Product',productSchema);
