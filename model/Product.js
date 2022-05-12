
const { Schema } = require("mongoose");
const conn = require("../lib/mongo");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [
    { type: Schema.Types.ObjectId, ref: 'Tag' }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = conn.model('Product', productSchema);
