const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/search/'
const fetch = require("node-fetch");



module.exports = {
    index,
    search
    }


function index(req ,res){
    searchResult = []
    query =''
      res.render('search', {searchResult});
}

async function search(req, res){
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
    res.render('search', {searchResult , type , user:req.user , query : searchString})
    
}

