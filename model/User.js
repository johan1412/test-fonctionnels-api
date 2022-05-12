const {Schema} = require('mongoose');
const conn = require("../lib/mongo");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min:6
  },
  role:{
    type: String,
    enum : ['ROLE_ADMIN','ROLE_USER'],
    default: 'ROLE_USER'
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  }
  ,
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = conn.model('User',userSchema);