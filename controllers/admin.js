const Movie = require('../models/movie')
const Serie = require('../models/series')


module.exports = {
    index,
    delete : deleteOne,

   
}


async function index(req, res) {
    let movies = await Movie.find({}).then(movies => movies)
    let series = await Serie.find({}).then(series => series)
    res.render('admin/index',{movies,series, user:req.user})
  }

async function deleteOne(req, res){
    
    if(req.body.type == 'serie'){
        Serie.findByIdAndRemove(req.params.id, function(err, serie) {
            res.redirect('/admin');
        });
    }else{
        console.log('hit the movie')
        Movie.findByIdAndRemove(req.params.id, function(err, movie) {
            res.redirect('/admin');
        });
    }

}