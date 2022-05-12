const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const userSchema = new Schema({
  label: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  product :{
      type:Schema.Types.ObjectId,
      ref:'Product'
  }
})

module.exports = conn.model('Tag',userSchema);