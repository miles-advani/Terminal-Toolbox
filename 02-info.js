// =============================================================================

// Project: toolbox/info.js
// Created: 19.09.2021
// info.js is a simple Node.js script that uses
// the ipify and ip-api and openweathermap APIs to
// display the current location, date, time, and weather.
// It also calculates the remaining days until a specific date.

// dependencies================================================================

// const axios = require("axios");
const moment = require("moment");

// API-key from openweathermap.org=============================================

// const API_KEY = "your API from openweathermap.org";
// const { API_KEY } = require("./config.js");

// import the functions from common.js=========================================

const {
  // getUserIP,
  getUserLocation,
  getLocalTime,
  getWeather,
  getRemainingDays,
} = require("./common.js");

// start of inserted code=====================================================
// end of inserted code=======================================================

// Function for displaying date, time, and weather============================

async function displayInfo() {
  const location = await getUserLocation();
  const localTime = await getLocalTime(location);
  const weather = await getWeather();
  const remainingDays = getRemainingDays();
  console.log(
    "\n============================================================\n"
  );
  console.log(`Location:  ${location}\n`);
  console.log(`Date:      ${moment(localTime).format("DD.MM.YYYY")}\n`);
  console.log(`Time:      ${moment(localTime).format("HH:mm:ss")}\n`);
  console.log(`Weather:   ${weather}°C\n`);
  console.log(`Days left: ${remainingDays}`);
  console.log(
    "\n============================================================\n"
  );
}

// call the function==========================================================

displayInfo();

// end of info.js=============================================================
