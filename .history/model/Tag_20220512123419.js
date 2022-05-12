const mongosse = require("mongoose");


const userSchema = new mongosse.Schema({
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