// =============================================================================
//
// Project: toolbox/info.js
// Created: 13.02.2024
// info.js is a simple Node.js script that uses
// the ipify and ip-api and openweathermap APIs to
// display the current location, date, time, and weather.
// It also calculates the remaining days until a specific date.
//
// =============================================================================

// dependencies================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const axios = require("axios");
const moment = require("moment");

// API's======================================================================

// const API_KEY = "insert your API from openweathermap.org here";
const { API_KEY } = require("./config.js");

// imports====================================================================

const {
  getUserLocation,
  getLocalTime,
  frameInfo,
} = require("./common.js");

// function for getting the weather based on the user's location===============

async function getWeather() {
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

// function for calculating the remaining days=================================

function getRemainingDays() {
  const today = moment();
  const targetDate = moment("19.09.2024", "DD.MM.YYYY");
  return targetDate.diff(today, "days");
}

// Function for displaying date, time, and weather============================

async function displayInfo() {
  const location = await getUserLocation();
  const localTime = await getLocalTime(location);
  const weather = await getWeather();
  const remainingDays = getRemainingDays();
  console.log(`\n`.repeat(20));
  console.log(`\n` + chalk.yellow(`Info `) + chalk.green(`=`.repeat(54) + `>`) + `\n`);
  console.log(` `.repeat(5) +
    chalk.yellow(`Time:`) +
      `      ${chalk.green(moment(localTime).format("HH:mm:ss"))}\n`
  );
  console.log(` `.repeat(5) +
    chalk.yellow(`Date:`) +
      `      ${chalk.green(moment(localTime).format("DD.MM.YYYY"))} ` +
      chalk.green(`(${remainingDays} Days)\n`)
  );
  console.log(` `.repeat(5) +
    chalk.yellow(`Weather:`) +
      `   ${chalk.green(weather + "°C")} ` +
      chalk.green(`(${location})`)
  );
  console.log(
    `\n` + chalk.yellow(`Apps `) + chalk.green(`=`.repeat(54) + `>`) + `\n`
  );

  // let message =
  // `\n` +
  //   chalk.yellow(`Time:`) +
  //   `      ${chalk.green(moment(localTime).format("HH:mm:ss"))}\n\n` +
  //   chalk.yellow(`Date:`) +
  //   `      ${chalk.green(moment(localTime).format("DD.MM.YYYY"))} ` +
  //   chalk.green(`(${remainingDays} Days)\n\n`) +
  //   chalk.yellow(`Weather:`) +
  //   `   ${chalk.green(weather + "°C")} ` +
  //   chalk.green(`(${location})`)+`\n`;

  // console.log(frameInfo(message));
}

// call the function==========================================================

// displayInfo();

// export the functions=======================================================

module.exports = { displayInfo };

// ===========================================================================s
