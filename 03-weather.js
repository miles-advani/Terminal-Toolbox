// =================================================================

// project: toolbox/weather.js
// date: 19.09.2021
// weather in for the next 5 days in the user's location
// use the functions from common.js
// and api.openweathermap.org

// dependencies====================================================

// const axios = require("axios");

// API-key from openweathermap.org and city name===================

// const API_KEY = "your API from openweathermap.org";
// const { API_KEY } = require("./config.js");

// import the functions from common.js==============================

const {
  // getUserIP,
  // getUserLocation,
  getForecast,
} = require("./common.js");

// Function to display the weather forecast===========================
async function displayForecast() {
  const forecast = await getForecast();
  console.log("\n=============== Weather ===============\n");

  forecast.forEach((item) => {
    console.log(`Date and time: ${item.dt_txt}`);
    console.log(`Temperature: ${item.main.temp}°C`);
    console.log(`Weather: ${item.weather[0].description}`);
    console.log("-------------------------");
  });
}

// call the function======================================================

displayForecast();

// end of info.js=========================================================
