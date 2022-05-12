const {Schema} = require("mongoose");


const userSchema = new Schema({
  label: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  product :{
      type: mongosse.Schema.Types.ObjectId,
      ref:'Product'
  }
})

module.exports = mongosse.model('Tag',userSchema);