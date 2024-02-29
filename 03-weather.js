// ===========================================================================

// project: toolbox/weather.js
// date: 13.02.2024
// weather in for the next 5 days in the user's location
// use the functions from common.js
// and api.openweathermap.org from config.js

// dependencies===============================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const axios = require("axios");
const readline = require("readline");

// API's=====================================================================

// const API_KEY = "insert your API from openweathermap.org here";

const { API_KEY } = require("./config.js");

// imports===================================================================

const {
  askQuestion,
  getUserLocation,
  runMatrix,
  frameError,
  // getLocalTime // not used in this file but file is not working without it?
} = require("./common.js");

const {
  paddingLeft,
  promptIndicator,
  selectOption,
  selectRefresh,
  selectGoBack,
  selectExit,
  weatherHeader,
  weatherBorder,
  refreshError,
  goBackError,
  exitError,
  invalidInputError,
} = require("./src/common/consoleMessages.js");

// Function to get the weather forecast based on the user's location==========

async function getForecast() {
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

// Function to display the weather forecast=================================

async function displayForecast(goBackCallback) {
  const { weatherBorderLog } = await weatherBorder();
  const forecast = await getForecast();
  console.log(`\n` + (await weatherHeader()).weatherHeaderLog + `\n`);

  forecast.forEach((item) => {
    console.log(`Date and time: ${item.dt_txt}`);
    console.log(`Temperature: ${item.main.temp}°C`);
    console.log(`Weather: ${item.weather[0].description}`);
    console.log(weatherBorderLog);
  });

  const option = await askQuestion(
    `\n` +
      paddingLeft +
      (
        await selectOption()
      ).selectOptionLog +
      `\n\n` +
      paddingLeft +
      (
        await selectRefresh()
      ).selectRefreshLog +
      `\n` +
      paddingLeft +
      (
        await selectGoBack()
      ).selectGoBackLog +
      `\n` +
      paddingLeft +
      (
        await selectExit()
      ).selectExitLog +
      `\n\n` +
      (
        await promptIndicator()
      ).promptIndicatorLog
  );

  switch (option) {
    case "r":
    case "R":
      // Refresh the forecast
      await displayForecast(goBackCallback);
      break;

    case "b":
    case "B":
      // Go back
      goBackCallback();
      break;

    case "e":
    case "E":
      // Exit the app
      // process.exit(0);
      runMatrix();
      break;

    default:
      console.log(
        frameError(
          (await invalidInputError()).invalidInputErrorLog +
            (await refreshError()).refreshErrorLog +
            (await goBackError()).goBackErrorLog +
            (await exitError()).exitErrorLog
        )
      );
      await displayForecast(goBackCallback);
  }
}

// call the function======================================================

// displayForecast();

// exports================================================================

module.exports = { displayForecast };

// =======================================================================
