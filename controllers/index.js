const Movie = require('../models/movie')
const Serie = require('../models/series')


module.exports = {
    index,
}

async function index(req, res) {
    let movieList =[]
    let seriesList=[]
    await Movie.aggregate([{$sample: {size:3}}]).then(res => movieList = res)
    await Serie.aggregate([{$sample: {size:3}}]).then(res => seriesList = res)
    console.log(movieList)
    console.log(seriesList)
    // await Movie.find({}).then(res => movieList = res)
    // await Serie.find({}).then(res => seriesList = res)
    res.render('index',{movies:movieList , series:seriesList ,user:req.user})


  }
