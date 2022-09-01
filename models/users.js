var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    list : Array,
    googleId: String,
    isAdmin: Boolean
  }, {
    timestamps: true
  });
  

  module.exports = mongoose.model('User' , userSchema)