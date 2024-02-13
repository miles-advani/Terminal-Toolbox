// ============================================================================

// common.js is a file that contains functions that are used by multiple files.
// api's to get the user's IP address and location, the weather, time and date.

// dependencies================================================================

const axios = require("axios");
const moment = require("moment");

// API-key from openweathermap.org=============================================

// const API_KEY = "enter your API from openweathermap.org";
const { API_KEY } = require("./config.js");

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

async function getUserLocation() {
  const ip = await getUserIP();
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data.city;
  } catch (error) {
    console.error(error);
  }
}

// function for getting the local time based on the user's location============
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

// function for getting the weather based on the user's location===============
async function getWeather() {
  //   const city = await getUserLocation();
  const city = await getUserLocation();
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data.main.temp;
  } catch (error) {
    console.error(error);
  }
}

// function for calculating the remaining days=================================

function getRemainingDays() {
  const today = moment();
  const targetDate = moment("19.09.2024", "DD.MM.YYYY");
  return targetDate.diff(today, "days");
}

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

// Export the functions=======================================================

module.exports = {
  getUserIP,
  getUserLocation,
  getWeather,
  getRemainingDays,
  getForecast,
  getLocalTime,
};
