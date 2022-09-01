const Movie = require('../models/movie')
const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/movie/'
const fetch = require("node-fetch");


module.exports = {
    index,
    new: newMovie,
    create,
    show
}

function index(req, res) {
    Movie.find({}, function(err, movies) {
      res.render('movies/index', { movies ,user:req.user });
    });
  }

function newMovie(req, res){
    res.render('movies/new',{user:req.user})
}

async function create(req, res) {
    let search=[]
    await Movie.find({id:req.body.movieId}).then(movie => search=movie)
    if(search.length !== 0){
      return res.render('movies/show',{movie: search[0],user:req.user})
    }
    let movie = new Movie
    try{
      let movieUrl = `${rootURL}${req.body.movieId}?api_key=${tmdbToken}`
      let movieData = await fetch(movieUrl).then(movie => movie.json())
      movie.backdrop_path = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
      movie.genres = movieData.genres
      movie.id = movieData.id
      movie.imdb_id = movieData.imdb_id
      movie.original_title = movieData.original_title
      movie.overview = movieData.overview
      movie.poster_path = `https://image.tmdb.org/t/p/original${movieData.poster_path}`
      movie.release_date = movieData.release_date
      movie.status = movieData.status
      movie.title = movieData.title
      movie.video = movieData.video
      movie.vote_average = movieData.vote_average
      movie.vote_count = movieData.vote_count
      res.render('movies/show' , {movie , user:req.user});
      movie.save()
    }catch(err){
      console.log(err);
    }
}  

function show(req,res){
  Movie.findById(req.params.id, function(err, movie) {
      res.render('movies/show', { movie , user:req.user});
    });
}