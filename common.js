// ============================================================================
//
// project: toolbox/common.js
// date: 13.02.2024
// common.js is a file that contains functions that are used by multiple files.
// ip and location functions are used by 02-info.js, 03-weather.js
//
// dependencies================================================================

// let chalk;
// import("chalk").then((module) => {
//   chalk = module.default;
// });

let stripAnsi;
import("strip-ansi").then((module) => {
  stripAnsi = module.default;
});

const axios = require("axios");

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

// style======================================================================
// ============================================================================
// function to frame error messages in red======================================

function frameError(message) {
  const lines = message.split("\n");
  const maxLength = Math.max(...lines.map((line) => stripAnsi(line).length)); // calculate the length of the longest line
  const borderLength = maxLength + 4; // calculate the length of the border
  const border = chalk.red("-".repeat(borderLength)); // frame line

  let result = border + "\n";
  for (const line of lines) {
    const paddingLength = borderLength - stripAnsi(line).length - 4; // number of additional spaces
    result +=
      chalk.red("| ") +
      line +
      " ".repeat(paddingLength) +
      chalk.red(" |") +
      "\n";
  }
  result += border;

  return result;
}

// function for green info frame==================================================

function frameInfo(message) {
  const lines = message.split("\n");
  const maxLength = Math.max(...lines.map((line) => stripAnsi(line).length)); // calculate the length of the longest line
  const borderLength = maxLength + 4; // calculate the length of the border
  const border = chalk.green("=".repeat(borderLength)); // frame line

  let result = border + "\n";
  for (const line of lines) {
    const paddingLength = borderLength - stripAnsi(line).length - 4; // number of additional spaces
    result +=
      chalk.green("| ") +
      line +
      " ".repeat(paddingLength) +
      chalk.green(" |") +
      "\n";
  }
  result += border;

  return result;
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

// exports====================================================================

module.exports = {
  getUserIP,
  getUserLocation,
  getLocalTime,
  frameError,
  frameInfo,
  runMatrix,
};

// ============================================================================
