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

// Matrix======================================================================
// ============================================================================
// ============================================================================

let readline, chalk;

import("readline").then((module) => {
  readline = module;
});

import("chalk").then((module) => {
  chalk = module.default;
});

let lines = process.stdout.rows;
let cols = process.stdout.columns;

let letters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
let colsArray = Array(cols).fill(0);

function runMatrix() {
  let intervalId = setInterval(() => {
    let randomCol = Math.floor(Math.random() * cols);
    let c = Math.floor(Math.random() * 72);
    let letter = letters[c];
    colsArray[randomCol] = 0;

    for (let col = 0; col < colsArray.length; col++) {
      let line = colsArray[col];
      colsArray[col]++;

      readline.cursorTo(process.stdout, col, line);
      process.stdout.write(chalk.green(letter));

      readline.cursorTo(process.stdout, col, colsArray[col]);
      process.stdout.write(chalk.white(letter));

      if (colsArray[col] >= lines) {
        colsArray[col] = 0;
      }
    }
  }, 50);

  // Stop the animation after 2.5 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 2500);
}

// call the function

// runMatrix();

// Export the functions=======================================================
// ============================================================================

module.exports = {
  getUserIP,
  getUserLocation,
  getLocalTime,
  runMatrix,
};
