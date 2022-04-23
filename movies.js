'use strict';

const axios = require('axios');

async function getMovies(req, res, next) {
  // console.log('getMovies(cityName): ', cityName);

  let params = {
    url: 'https://api.themoviedb.org/3/search/movie',
    query: req.query.city,
    country: 'US',
    page: 1,
    api_key: process.env.MOVIE_API_KEY_THEMOVIEDB,
    include_adult: false
  };

  //
  try {
    let moviesUrl = `${params.url}?api_key=${params.api_key}&query=${params.query}&page=${params.page}&${params.include_adult}&${params.country}`;
    // console.log('moviesUrl: ', moviesUrl);
    let moviesResponse = await axios.get(moviesUrl);
    // console.log('moviesResponse: ', moviesResponse);
    let moviesResData = moviesResponse.data;
    // console.log('moviesResData: ', moviesResData);
    let moviesArr = moviesResData.results.map((movie) => new Movie(movie));
    // console.log('moviesArr: ', moviesArr);
    // return moviesArr;
    res.status(200).send(moviesArr);
  }
  catch (error) {
    Promise.resolve().then(()=>{
      throw new Error(error.message);
    }).catch(next);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image_url = 'https://image.tmdb.org/t/p/w500'+movieObj.poster_path;
  }
}

module.exports = getMovies;
