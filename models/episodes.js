const mongoose = require('mongoose')

const Schema = mongoose.Schema

const episodesSchema = new Schema({
    backdrop_path: String,
    first_air_date: String,
    genres: [{id: Number, name: String}],
    id: Number,
    in_production: Boolean,
    name: String,
    number_of_episodes: Number,
    number_of_seasons: Number,
    overview: String,
    poster_path: String,
    vote_average: Number,
    vote_count: Number
})


module.exports = mongoose.model('Episode' , episodesSchema)

