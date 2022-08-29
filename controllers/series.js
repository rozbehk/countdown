const Serie = require('../models/series')
const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/tv/'
const request = require('request');


module.exports = {
    index,
    new: newSerie,
    create
}

function index(req, res) {
    Serie.find({}, function(err, series) {
      res.render('series/index', { series });
    });
  }

function newSerie(req, res){
    res.render('series/new')
}

function create(req, res) {
    let seriesUrl = `${rootURL}${req.body.seriesId}?api_key=${tmdbToken}`
    console.log(seriesUrl)
    request(seriesUrl,function(err, response, body){
        sd = JSON.parse(body)
        console.log(sd)
        
        if(err){
           return console.log(err)
        }else{
            let serie = new Serie
            serie.backdrop_path = `https://image.tmdb.org/t/p/original${sd.backdrop_path}`
            serie.first_air_date = sd.first_air_date
            serie.genres = sd.genres
            serie.id = sd.id
            serie.in_production = sd.in_production
            serie.name = sd.name
            serie.number_of_episodes = sd.number_of_episodes
            serie.number_of_seasons = sd.number_of_seasons
            serie.overview = sd.overview
            serie.poster_path = `https://image.tmdb.org/t/p/original${sd.poster_path}`
            serie.vote_average = sd.vote_average
            serie.vote_count = sd.vote_count
            serie.save()
            console.log(serie)
        }
    })
    

      res.redirect('/series');
  }
