// ============================================================================
//
// common.js is a file that contains functions that are used by multiple files.
// api's to get the user's IP address and location, the weather, time and date.
//
// dependencies================================================================

const axios = require("axios");
const moment = require("moment");
const math = require("mathjs");

// insert openweathermap.org api or import it from config.js===================

// const API_KEY = "enter your API from openweathermap.org";
const { API_KEY } = require("./config.js");

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

// weather=====================================================================
// ============================================================================
// function for getting the weather based on the user's location===============

async function getWeather() {
  //   const city = await getUserLocation();
  const location = await getUserLocation();
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data.main.temp;
  } catch (error) {
    console.error(error);
  }
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

// calculations================================================================
// ============================================================================
// function for calculating the remaining days=================================

function getRemainingDays() {
  const today = moment();
  const targetDate = moment("19.09.2024", "DD.MM.YYYY");
  return targetDate.diff(today, "days");
}

// function for performing basic operations====================================

// function calculate(operation, num1, num2) {
//   switch (operation) {
//     case "add":
//       return math.add(num1, num2);
//     case "subtract":
//       return math.subtract(num1, num2);
//     case "multiply":
//       return math.multiply(num1, num2);
//     case "divide":
//       return math.divide(num1, num2);
//     default:
//       return "Invalid operation";
//   }
// }

// function for handling complex operations====================================

function calculate(expression) {
  try {
    return math.evaluate(expression);
  } catch (error) {
    return "Invalid operation";
  }
}

// function for converting px to rem==========================================

function convertPxToRem(px, base = 16) {
  return px / base;
}

function convertRemToPx(rem, base = 16) {
  return rem * base;
}

// Export the functions=======================================================
// ===========================================================================

module.exports = {
  getUserIP,
  getUserLocation,
  getWeather,
  getForecast,
  getLocalTime,
  getRemainingDays,
  calculate,
  convertPxToRem,
  convertRemToPx,
};
