'use strict';
const axios = require('axios');

async function getWeather(lattitude, longitude) {
  let params = {
    url: 'http://api.weatherbit.io/v2.0/forecast/daily',
    lat: lattitude,
    lon: longitude,
    days: 3,
    units: 'S',
    api_key: process.env.REACT_APP_WEATHERBIT_API_KEY
  };
  let wxUrl = `${params.url}?lat=${params.lat}&lon=${params.lon}&days=${params.days}&units=${params.units}&key=${params.api_key}`;
  let wxResponse = await axios.get(wxUrl);
  let wxResData = wxResponse.data;
  let wxResDataData = wxResData.data;
  let forecasts = wxResDataData.map((dayForecast) => new Forecast(dayForecast.datetime, dayForecast.weather.description));
  return forecasts;
}

//  classes
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

module.exports = getWeather;
