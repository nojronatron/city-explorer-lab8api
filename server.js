'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./weather.js');
const getMovies = require('./movies.js');
const app = express();
const PORT = process.env.PORT || 3002; // added fallback port

app.use(cors());

app.get('/weather', weatherHandler);

app.get('/movies', movieHandler);

function weatherHandler(req, res) {
  const { lat, lon } = req.query;
  console.log(req.query);
  weather(lat, lon)
    .then(summaries => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
}

function movieHandler(req, res) {
  const { city } = req.query;
  console.log('movieHandler req.query: ' + req.query);
  getMovies(city)
    .then(summaries => res.send(summaries))
    .catch((err) => {
      console.error('movieHandler.getmovies error: ', err);
      res.status(500).send(err.message);
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${PORT}`));
