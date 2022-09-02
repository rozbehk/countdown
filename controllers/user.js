const User = require("../models/users");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  index,
  update,
  delete: deleteOne,
  moviesIndex,
  seriesIndex,
};

function index(req, res) {
  User.find({}, function (err, list) {
    res.render("user", { list, user: req.user });
  });
}

async function update(req, res) {
  if (req.body.ref == "Series") {
    req.user.seriesList.push(req.params.id);
    req.user.save();
    res.redirect("/user/series");
  } else {
    req.user.moviesList.push(req.params.id);
    res.redirect("/user/movies");
    req.user.save();
  }

}

function deleteOne(req, res) {
  if (req.body.ref == "Series") {
    console.log('remove series')
    req.user.seriesList.remove(mongoose.Types.ObjectId(req.params));
    res.redirect("/user/series");
    req.user.save();
  } else {
    console.log('remove movie')
    req.user.moviesList.remove(mongoose.Types.ObjectId(req.params));
    res.redirect("/user/movies");
    req.user.save();
  }
}

async function moviesIndex(req, res) {
  const userMovies = await User.findById(req.user._id).populate({
    path: "moviesList",
  });
  res.render("user/movies", { movies :userMovies.moviesList , user: req.user});
}
async function seriesIndex(req, res) {
  const userSeries = await User.findById(req.user._id).populate({
    path: "seriesList",
  });
  res.render("user/series", { series :userSeries.seriesList , user: req.user});
}
