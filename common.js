// ============================================================================
//
// common.js is a file that contains functions that are used by multiple files.
// ip and location functions are used by 02-info.js, 03-weather.js
//
// dependencies================================================================

const axios = require("axios");
// const moment = require("moment");
// const math = require("mathjs");
// const readline = require("readline");

// insert openweathermap.org api or import it from config.js===================

// const API_KEY = "enter your API from openweathermap.org";
// const { API_KEY } = require("./config.js");

// location====================================================================
// ============================================================================
// functions for getting the user's IP=========================================

async function getUserIP() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error(error);
  }
}

// function for getting the user's location=====================================
// used in 02-info.js, 03-weather.js

async function getUserLocation() {
  const ip = await getUserIP();
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data.city;
  } catch (error) {
    console.error(error);
  }
}

// date and time===============================================================
// ============================================================================
// function for getting the local time based on the user's location============
// it's not used in weather.js but weather.js breaks without it
// used in 02-info.js

async function getLocalTime(location) {
  try {
    const response = await axios.get(
      `http://api.geonames.org/timezoneJSON?lat=${location.lat}&lng=${location.lon}&username=demo`
    );
    return response.data.time;
  } catch (error) {
    console.error(error);
  }
}

// Export the functions=======================================================
// ============================================================================

module.exports = {
  getUserIP,
  getUserLocation,
  getLocalTime,
};
