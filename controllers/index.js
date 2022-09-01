const Movie = require('../models/movie')
const Serie = require('../models/series')


module.exports = {
    index,
}

async function index(req, res) {
    let movieList 
    let seriesList
    await Movie.find({}).then(res => movieList = res)
    await Serie.find({}).then(res => seriesList = res)
    res.render('index',{movies:movieList , series:seriesList ,user:req.user})


  }
