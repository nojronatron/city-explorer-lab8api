'use strict';
const axios = require('axios');
let cache = require('./modules/cache.js');

async function getWeather(lattitude, longitude) {
  console.log('entered getWeather at ', Date.now());
  let forecasts;
  let weatherQueryResult;
  // implement cache
  // let threeHours = 1000 * 60 * 60 * 3;
  let testExpire = 1000*30;

  // TODO: uncomment threeHours and assign to cacheExpire when done testing
  let cacheExpire = testExpire;
  let cacheKey = 'weather-' + lattitude + longitude;
  console.log('date.now\tcacheExpire\tcacheKey');
  console.log(Date.now(), cacheExpire, cacheKey);

  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 30000)) {
    console.log('cache hit! Returning cached data.');
    weatherQueryResult = cache[cacheKey].data;
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

    // update the cache with the latest retreived data
    cache[cacheKey] = {};
    cache[cacheKey].timestamp = Date.now();
    cache[cacheKey].data = await axios.get(wxUrl);
    // end update cache

    // process data for return to the caller, sending only what the client needs
    weatherQueryResult = cache[cacheKey].data;
  }

  // console.log('weatherQueryResult.data.data: ', weatherQueryResult.data.data);
  forecasts = weatherQueryResult.data.data.map((dayForecast) => new Forecast(dayForecast.datetime, dayForecast.weather.description));

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
