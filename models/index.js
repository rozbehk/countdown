const mongoose = require('mongoose')
const Schema = mongoose.Schema

var indexSchema = new Schema({
    moviesList: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    seriesList: [{type: Schema.Types.ObjectId, ref: 'Series'}],
  }, {
    timestamps: true
  });
  

  module.exports = mongoose.model('Index' , indexSchema)