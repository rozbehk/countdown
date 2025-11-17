const Movie = require("../models/movie");
const Serie = require("../models/series");

module.exports = {
  index,
};

async function index(req, res) {
  let movieList = [];
  let seriesList = [];

  await Movie.aggregate([{ $sample: { size: 10 } }]).then(
    (res) => (movieList = res)
  );
  await Serie.aggregate([{ $sample: { size: 10 } }]).then(
    (res) => (seriesList = res)
  );

  // Calculate nearest date for each series
  const seriesWithCountdown = seriesList.map((serie) => {
    let nearestDate = null;
    const now = new Date();

    if (serie.seasons && serie.seasons.length > 0) {
      serie.seasons.forEach((season) => {
        if (season.episode && season.episode.length > 0) {
          season.episode.forEach((episode) => {
            if (episode.air_date) {
              const episodeDate = new Date(episode.air_date);
              if (episodeDate > now) {
                if (!nearestDate || episodeDate < nearestDate) {
                  nearestDate = episodeDate;
                }
              }
            }
          });
        }
      });
    }

    return {
      ...serie,
      nextEpisodeDate: nearestDate,
    };
  });

  res.render("index", {
    movies: movieList,
    series: seriesWithCountdown,
    user: req.user,
  });
}
