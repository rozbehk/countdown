const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/search/'
const fetch = require("node-fetch");
const movie = require("../models/movie");


module.exports = {
    index,
    search
    }


function index(req ,res){
    searchResult = []
      res.render('search', searchResult);
}

async function search(req, res){
    let searchResult = []
    let type
    searchString = req.body.searchString
    console.log(req.body.searchString)
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
        movieData = await fetch(requestUrl).then(search => search.json())
        let totalPages= movieData.total_pages

        for( let i=1 ; i <= totalPages ; i++){
            let requestUrl = `${rootURL}tv?api_key=${tmdbToken}&language=en-US&page=${i}&query=${searchString}&include_adult=false`
            moviesData = await fetch(requestUrl).then(search => search.json())
            moviesData.results.forEach(function(movie){
                searchResult.push(movie)
            })
            
        }        
    }
    res.render('search', {searchResult , type},)
    
}

// https://api.themoviedb.org/3/search/tv?api_key=1361af232d3ffec1e6e18064b8b8ecb4&language=en-US&page=1&query=dragon%20&include_adult=false
// https://api.themoviedb.org/3/search/tv?api_key=1361af232d3ffec1e6e18064b8b8ecb4&language=en-US&page=1&query=undefined&include_adult=false