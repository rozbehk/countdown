const Movie = require('../models/movie')
const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/movie/'
const request = require('request');


module.exports = {
    index,
    new: newMovie,
    create
}

function index(req, res) {
    Movie.find({}, function(err, movies) {
      res.render('movies/index', { movies });
    });
  }

function newMovie(req, res){
    res.render('movies/new')
}

function create(req, res) {
    let movieUrl = `${rootURL}${req.body.movieId}?api_key=${tmdbToken}`
    console.log(movieUrl)
    request(movieUrl,function(err, response, body){
        md = JSON.parse(body)
        if(err){
           return console.log(err)
        }else{
            let movie = new Movie
            movie.backdrop_path = `https://image.tmdb.org/t/p/original${md.backdrop_path}`
            movie.genres = md.genres
            console.log(movie.genres)
            movie.id = md.id
            movie.imdb_id = md.imdb_id
            movie.original_title = md.original_title
            movie.overview = md.overview
            movie.poster_path = `https://image.tmdb.org/t/p/original${md.poster_path}`
            movie.release_date = md.release_date
            movie.status = md.status
            movie.title = md.title
            movie.video = md.video
            movie.vote_average = md.vote_average
            movie.vote_count = md.vote_count
            movie.save()
        }
    })
    
    // // convert nowShowing's checkbox of nothing or "on" to boolean
    // req.body.nowShowing = !!req.body.nowShowing;
    // // remove whitespace next to commas
    // req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
    // // split if it's not an empty string
    // if (req.body.cast) req.body.cast = req.body.cast.split(',');
    // for (let key in req.body) {
    //   if (req.body[key] === '') delete req.body[key];
    // }
    // const movie = new Movie(req.body);
    // movie.save(function(err) {
    //   // one way to handle errors
    //   if (err) return res.render('movies/new');
    //   console.log(movie);
    //   // for now, redirect right back to new.ejs
      res.redirect('/movies');
    // });
  }
