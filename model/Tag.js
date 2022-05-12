const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  product :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'
  }
})

module.exports = mongoose.model('Tag',userSchema);