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

// insert openweathermap.org api or import it from config.js===================

// const API_KEY = "your API from openweathermap.org";
const { API_KEY } = require("./config.js");

// import functions from other files==========================================

const {
  // getUserIP,
  getUserLocation,
  getLocalTime,
} = require("./common.js");

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
  console.log(
    chalk.green("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<============================================================>\n")
  );
  console.log(`Location:  ${location}\n`);
  console.log(`Date:      ${moment(localTime).format("DD.MM.YYYY")}\n`);
  console.log(`Time:      ${moment(localTime).format("HH:mm:ss")}\n`);
  console.log(`Weather:   ${weather}°C\n`);
  console.log(`Days left: ${remainingDays}`);
  console.log(
    "\n<=========================== Apps ===========================>\n"
  );
}

// call the function==========================================================

// displayInfo();

// export the functions=======================================================

module.exports = { displayInfo };

// ===========================================================================s
