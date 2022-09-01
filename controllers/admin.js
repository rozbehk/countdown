const Movie = require('../models/movie')
const series = require('../models/series')
const Serie = require('../models/series')


module.exports = {
    index,
   
}


async function index(req, res) {
    let movies = await Movie.find({}).then(movies => movies)
    let series = await Serie.find({}).then(series => series)
    res.render('admin/index',{movies,series, user:req.user})
  }