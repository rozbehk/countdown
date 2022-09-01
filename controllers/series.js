const Serie = require('../models/series')
const tmdbToken = process.env.TMDB_TOKEN
const rootURL= 'https://api.themoviedb.org/3/tv/'
const fetch = require("node-fetch");



module.exports = {
    index,
    new: newSerie,
    create,
    show,
    delete: deleteOne
    }

async function index(req, res) {
    Serie.find({}, function(err, series) {
      res.render('series/index', { series,user:req.user });
    });
  }

function newSerie(req, res){
    res.render('series/new',{user:req.user})
}

async function create(req, res) {
    let search=[]
    await Serie.find({id:req.body.seriesId}).then(serie => search=serie)
    if(search.length !== 0){
        return res.render('series/show',{serie: search[0],user:req.user})
    }
        
    let seriesSchema = new Serie
    try{
        let seriesUrl = `${rootURL}${req.body.seriesId}?api_key=${tmdbToken}&language=en-US`
        let seriesData = await fetch(seriesUrl).then(serie => serie.json())

        seriesSchema.backdrop_path = `https://image.tmdb.org/t/p/original${seriesData.backdrop_path}`
        seriesSchema.first_air_date = seriesData.first_air_date
        seriesSchema.genres = seriesData.genres
        seriesSchema.id = seriesData.id
        seriesSchema.in_production = seriesData.in_production
        seriesSchema.name = seriesData.name
        seriesSchema.number_of_episodes = seriesData.number_of_episodes
        seriesSchema.number_of_seasons = seriesData.number_of_seasons
        seriesSchema.overview = seriesData.overview
        seriesSchema.poster_path = `https://image.tmdb.org/t/p/w500${seriesData.poster_path}`
        seriesSchema.vote_average = seriesData.vote_average
        seriesSchema.vote_count = seriesData.vote_count
       
    }catch(err){
        console.log(err);
  }
    try{
        let seasonDetail = []
        for( i = 1 ; i <= seriesSchema.number_of_seasons ; i++){
            let episodeDetail=[]
            let seasonsUrl = `${rootURL}${req.body.seriesId}/season/${i}?api_key=${tmdbToken}&language=en-US`

            let seasonsData = await fetch(seasonsUrl).then(episode => episode.json())
                seasonsData.episodes.forEach(function(episode) {
                    episodeDetail.push({
                        air_date: episode.air_date,
                        // air_date: new Date(episode.air_date.replace(/-/g, '\/').replace(/T.+/, '')),
                        episode_number: episode.episode_number,
                        name: episode.name,
                        season_number: episode.season_number,
                        still_path: episode.still_path,
                    })       
                          
                });

                seasonDetail.push({
                    air_date : seasonsData.air_date,
                    name : seasonsData.name,
                    season_number: seasonsData.season_number,
                    episode : episodeDetail
                })

            }
        seriesSchema.seasons = seasonDetail
        res.render('series/show' , {serie: seriesSchema,user:req.user},)
        seriesSchema.save()
        
        
    }catch(err){
        console.log(err);
        res.redirect('/series',{user:req.user})
    }
}


function show(req,res){
    
    Serie.findById(req.params.id, function(err, serie) {
        
        res.render('series/show', { serie ,user:req.user});
      });
      
}

function deleteOne(req, res){
    console.log(req)
}
       