'use strict';

//  requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { use } = require('express/lib/application');
const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

//  globals
const app = express();
const PORT = process.env.PORT || 3002; // added fallback port

//  use
app.use(cors());


/*  routes  */
//  root
app.get('/', (req, res) => {
  res.status(420).send('Ehlow orld.');
});

//  weather
app.get('/weather', getWeather);

//  movies route
app.get('/movies', getMovies);
// app.get('/movies', async (req, res) => {
//   let clientRequest = req.query.city;
//   let movieQuery = clientRequest ? clientRequest : '';
//   if (movieQuery.length < 1) {
//     res.status(400).send('Input too short. Add letters, get betters.');
//   }
//   console.log('received query: ', movieQuery);
//   let result = await getMovies(movieQuery);
//   res.status(200).send(result);
// });

//  catch-all route must be last
app.get('*', (req, res) => {
  res.status(404).send('Nothing here, move along. . .');
});

//  listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//  error handling
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(error.message);
});
