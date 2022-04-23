'use strict';
const axios = require('axios');

//async function getWeather(cityName) {
async function getWeather(req, res, next) {
  //  TODO: verify param.city value is correct
  try {
    let params = {
      url: 'http://api.weatherbit.io/v2.0/forecast/daily',
      city: req.query.city,
      country: 'US',
      days: 3,
      units: 'S',
      api_key: process.env.REACT_APP_WEATHERBIT_API_KEY
    };
    let wxUrl = `${params.url}?city=${params.city}&country=${params.country}&days=${params.days}&units=${params.units}&key=${params.api_key}`;
    let wxResponse = await axios.get(wxUrl);
    let wxResData = wxResponse.data;
    let wxResDataData = wxResData.data;
    let forecasts = wxResDataData.map((dayForecast) => new Forecast(dayForecast.datetime, dayForecast.weather.description));
    res.status(200).send(forecasts);
  }
  catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

//  classes
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

module.exports = getWeather;
