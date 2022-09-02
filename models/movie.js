const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    backdrop_path: String,
    genres: [{id: String , name: String}],
    id: Number,
    imdb_id: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    status: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
})


module.exports = mongoose.model('Movie' , movieSchema)

