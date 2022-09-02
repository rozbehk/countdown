const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    moviesList: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    seriesList: [{type: Schema.Types.ObjectId, ref: 'Series'}],
    googleId: String,
    isAdmin: Boolean
  }, {
    timestamps: true
  });
  

  module.exports = mongoose.model('User' , userSchema)