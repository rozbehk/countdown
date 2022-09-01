const User = require('../models/users')
const fetch = require("node-fetch");


module.exports = {
    index,
}

function index(req, res) {
  User.find({}, function(err, list) {
      res.render('profile', { list ,user:req.user });
    });
  }

function newMovie(req, res){
    res.render('movies/new',{user:req.user})
}
