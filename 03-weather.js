// ===========================================================================

// project: toolbox/weather.js
// date: 13.02.2024
// weather in for the next 5 days in the user's location
// use the functions from common.js
// and api.openweathermap.org from config.js

// dependencies===============================================================

const axios = require("axios");

// insert openweathermap.org api or import it from config.js==================

// const API_KEY = "your API from openweathermap.org";
const { API_KEY } = require("./config.js");

// import functions from other files==========================================

const {
  // getUserIP,
  getUserLocation,
  // getLocalTime // not used in this file but file is not working without it?
} = require("./common.js");

// Function to get the weather forecast based on the user's location==========

async function getForecast() {
  //   const city = await getUserLocation();
  const location = await getUserLocation();
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data.list;
  } catch (error) {
    console.error(error);
  }
}

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

// displayForecast();

// exports================================================================

module.exports = { displayForecast };

// =======================================================================
