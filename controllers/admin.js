const Movie = require('../models/movie')
const Serie = require('../models/series')
const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/search/'
const fetch = require("node-fetch");


module.exports = {
    index,
    delete : deleteOne,
    searchIndex,
    search,
    moviesIndex,
    seriesIndex
}


async function index(req, res) {
    let movies = await Movie.find({}).then(movies => movies)
    let series = await Serie.find({}).then(series => series)
    res.render('admin/index',{movies,series, user:req.user})
  }

function deleteOne(req, res){
    
    if(req.body.type == 'serie'){
        Serie.findByIdAndRemove(req.params.id, function(err, serie) {
            res.redirect('/admin');
        });
    }else{
        Movie.findByIdAndRemove(req.params.id, function(err, movie) {
            res.redirect('/admin');
        });
    }

}

function searchIndex(req ,res){
    searchResult = []
    query =''
      res.render('admin/search', {searchResult,user:req.user ,query });
}

async function search (req, res){
    let searchResult = []
    let type
    searchString = req.body.searchString
    if(req.body.type === 'movie'){
        type= 'movie'
        let i=1
        let requestUrl = `${rootURL}movie?api_key=${tmdbToken}&language=en-US&query=${searchString}&page=1&include_adult=false`
        movieData = await fetch(requestUrl).then(search => search.json())
        let totalPages= movieData.total_pages

        for( let i=1 ; i <= totalPages ; i++){
            let requestUrl = `${rootURL}movie?api_key=${tmdbToken}&language=en-US&page=${i}&query=${searchString}&include_adult=false`
            moviesData = await fetch(requestUrl).then(search => search.json())
            moviesData.results.forEach(function(movie){
                searchResult.push(movie)
            })
            
        }        
    }else{
        let i=1
        type= 'tv'
        let requestUrl = `${rootURL}tv?api_key=${tmdbToken}&language=en-US&query=${searchString}&page=1&include_adult=false`
        serieData = await fetch(requestUrl).then(search => search.json())
        let totalPages= serieData.total_pages

        for( let i=1 ; i <= totalPages ; i++){
            let requestUrl = `${rootURL}tv?api_key=${tmdbToken}&language=en-US&page=${i}&query=${searchString}&include_adult=false`
            serieData = await fetch(requestUrl).then(search => search.json())
            serieData.results.forEach(function(serie){
                searchResult.push(serie)
            })
            
        }        
    }
    res.render('admin/search', {searchResult , type, query : searchString})
    
}

function moviesIndex(req, res) {
    Movie.find({}, function(err, movies) {
      res.render('admin/movies', { movies ,user:req.user });
    });
  }

function seriesIndex(req, res) {
    Serie.find({}, function(err, series) {
      res.render('admin/series', { series,user:req.user });
    });
  }