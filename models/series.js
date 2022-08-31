const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodesSchema = new Schema({
        air_date: String,
        episode_number: Number,
        name: String,
        season_number: Number,
        still_path: String,
})

const seasonsSchema = new Schema({ 
        air_date : String,
        name : String,
        episode : [episodesSchema],
        season_number: Number,
})

const seriesSchema = new Schema({
    
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
    vote_count: Number,
    seasons : [{ 
        air_date : String,
        name : String,
        episode : [{
            air_date: Array,
            episode_number: Number,
            name: String,
            season_number: Number,
            still_path: String,
    }],
        season_number: Number,
}]
})


module.exports = mongoose.model('Series' , seriesSchema)



