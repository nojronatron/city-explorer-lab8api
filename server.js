'use strict';

//  requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

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

//  photos
app.get('/photos', (req, res) => {
  //  TODO: implement this route
});

//  catch-all route must be last
app.get('*', (req, res) => {
  res.status(404).send('Nothing here, move along. . .');
});

//  classes

//  listen
app.listen(PORT, () => console.log('Listening on port: ${PORT}'));

//  error handling
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(error.message);
});
