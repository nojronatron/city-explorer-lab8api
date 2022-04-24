'use strict';
const axios = require('axios');

async function getMovies(cityName) {
  console.log('now inside getMovies.');
  console.log('received passed-in cityName parameter: ', cityName);

  let params = {
    url: 'https://api.themoviedb.org/3/search/movie',
    query: cityName,
    country: 'US',
    page: 1,
    api_key: process.env.MOVIE_API_KEY_THEMOVIEDB,
    include_adult: false
  };

  let moviesUrl = `${params.url}?api_key=${params.api_key}&query=${params.query}&${params.include_adult}`;
  let moviesResponse = await axios.get(moviesUrl);

  //  debugging
  // let shortViewOutput = [];
  // moviesResponse.data.results.forEach((resultProp) => {
  //   shortViewOutput.push({
  //     poster_path: resultProp.poster_path,
  //     title: resultProp.title,
  //     overview: resultProp.overview,
  //   });
  // });

  // console.dir(shortViewOutput);
  // end debugging

  let moviesArr = moviesResponse.data.results.map(movie => {
    return new Movie(movie);
  });

  //  debugging
  console.dir(moviesArr);
  //  end debugging

  return moviesArr;
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image_url = 'https://image.tmdb.org/t/p/w500'+movieObj.poster_path;
  }
}

module.exports = getMovies;
