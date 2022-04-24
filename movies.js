'use strict';
const axios = require('axios');
let cache = require('./modules/cache.js');
let moviesArr;
let cacheTimeout = 1000 * 60 * 60 * 24 * 10;

async function getMovies(cityName) {
  let cacheKey = process.env.MOVIE_API_KEY_THEMOVIEDB;
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

  //  implement cache
  if (cache[cacheKey] &&
        cache[cacheKey].data.config.url.includes(params.query) &&
        (Date.now() - cache[cacheKey].timestamp < cacheTimeout)) {
    console.log('Cache hit. Returning movies from cache.');
  } else {
    console.log('cache miss! Making call to remote API and refreshing cache.');
    cache[cacheKey] = {};
    cache[cacheKey].timestamp = Date.now();
    cache[cacheKey].data = await axios.get(moviesUrl);
  }

  console.log('current cache .data.config.url: ', cache[cacheKey].data.config.url);
  var moviesFromCache = cache[cacheKey].data.data.results;
  // console.log('moviesFromCache: ', moviesFromCache);
  moviesArr = moviesFromCache.map(movie => {
    return new Movie(movie);
  });

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
