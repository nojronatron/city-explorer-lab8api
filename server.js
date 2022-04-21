'use strict';

//  requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//  globals
const app = express();
const PORT = process.env.PORT;

//  use
app.use(cors());

//  classes
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

//  routes
//  root
app.get('/', (req, res) => {
  res.status(200).send('Ehlow orld.');
});

//  weather
app.get('/weather', (req, res) => {
  //  TODO: implement this route
  //  let wxUrl = http://localhost:3001/weather?city=${this.state.city};
  res.status(501).send('Not Implemented. Come back later.');
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
