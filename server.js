'use strict';

//  requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { use } = require('express/lib/application');
const getWeather = require('./weather.js');

//  globals
const app = express();
const PORT = process.env.PORT || 3002; // added fallback port

//  use
app.use(cors());


class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image_url = 'https://image.tmdb.org/t/p/w500'+movieObj.poster_path;
  }
}

//  routes
//  root
app.get('/', (req, res) => {
  res.status(420).send('Ehlow orld.');
});

//  weather
app.get('/weather', getWeather);
// app.get('/weather', async (req, res) => {
//   let clientRequest = req.query.city;
//   let cityQuery = clientRequest ? clientRequest : '';
//   //
//   // see https://en.wikipedia.org/wiki/List_of_short_place_names
//   if (cityQuery.length < 1) {
//     res.status(400).send('Input too short. Add letters, get betters.');
//   }

//   let result = await getWeather(cityQuery);
//   res.status(200).send(result);
//   //res.status(501).send('Not Implemented. Come back later.');
// });

async function getMovies(cityName) {
  console.log('getMovies(cityName): ', cityName);

  let params = {
    url: 'https://api.themoviedb.org/3/search/movie',
    bananas: cityName,
    country: 'US',
    page: 1,
    api_key: process.env.MOVIE_API_KEY_THEMOVIEDB,
    include_adult: false
  };
  //
  let moviesUrl = `${params.url}?api_key=${params.api_key}&query=${params.bananas}&page=${params.page}&${params.include_adult}&${params.country}`;
  
  console.log('moviesUrl: ', moviesUrl);

  let moviesResponse = await axios.get(moviesUrl);
  console.log('moviesResponse: ', moviesResponse);

  let moviesResData = moviesResponse.data;
  console.log('moviesResData: ', moviesResData);

  let moviesArr = moviesResData.results.map((movie) => new Movie(movie));

  console.log('moviesArr: ', moviesArr);
  return moviesArr;


}

//  movies route
app.get('/movies', async (req, res) => {
  let clientRequest = req.query.city;
  let movieQuery = clientRequest ? clientRequest : '';
  if (movieQuery.length < 1) {
    res.status(400).send('Input too short. Add letters, get betters.');
  }
  console.log('received query: ', movieQuery);
  let result = await getMovies(movieQuery);
  res.status(200).send(result);
});

//  catch-all route must be last
app.get('*', (req, res) => {
  res.status(404).send('Nothing here, move along. . .');
});

//  classes

//  listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//  error handling
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(error.message);
});
