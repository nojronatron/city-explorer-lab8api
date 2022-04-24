'use strict';
const axios = require('axios');
let cache = require('./modules/cache.js');

async function getWeather(lattitude, longitude) {
  let forecasts;
  // implement cache
  // let threeHours = 1000 * 60 * 60 * 3;
  let testExpire = 1000*30;

  // TODO: uncomment threeHours and assign to cacheExpire when done testing
  let cacheExpire = testExpire;
  let cacheKey = 'weather-' + lattitude + longitude;

  if (cache[cacheKey] && Date.now() - cache[cacheKey].timeStamp < {cacheExpire}) {
    console.log('cache hit!');
    forecasts = cache[cacheKey];
  } else {
    console.log('cache miss! Fetching update from API.');
    let params = {
      url: 'http://api.weatherbit.io/v2.0/forecast/daily',
      lat: lattitude,
      lon: longitude,
      days: 3,
      units: 'S',
      api_key: process.env.WEATHERBIT_API_KEY,
    };

    let wxUrl = `${params.url}?lat=${params.lat}&lon=${params.lon}&days=${params.days}&units=${params.units}&key=${params.api_key}`;
    let wxResponse = await axios.get(wxUrl);
    let wxResData = wxResponse.data;
    let wxResDataData = wxResData.data;
    forecasts = wxResDataData.map((dayForecast) => new Forecast(dayForecast.datetime, dayForecast.weather.description));
  }

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
