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

// insert openweathermap.org api or import it from config.js==================

// const API_KEY = "your API from openweathermap.org";

const { API_KEY } = require("./config.js");

// import functions from other files==========================================

const {
  // getUserIP, // used by getUserLocation
  getUserLocation,
  runMatrix,
  frameError,
  // getLocalTime // not used in this file but file is not working without it?
} = require("./common.js");
// const { runMatrix } = require("./common.js");

// Function to get the weather forecast based on the user's location==========

async function getForecast() {
  //   const city = await getUserLocation();º
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

// function to call the menu==================================================

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

// Function to display the weather forecast=================================

async function displayForecast(goBackCallback) {
  const forecast = await getForecast();
  console.log( `\n` +
  chalk.yellow(`Weather `) +
    chalk.green(`=`.repeat(36) +
    `>`)+ `\n`);

  forecast.forEach((item) => {
    console.log(`Date and time: ${item.dt_txt}`);
    console.log(`Temperature: ${item.main.temp}°C`);
    console.log(`Weather: ${item.weather[0].description}`);
    console.log(chalk.green("-----------------------------------"));
  });

  const option = await askQuestion(
    `${chalk.yellow("\nPlease select an option: \n\n")}${chalk.green(
      "1."
    )}${chalk.yellow(" Refresh \n")}${chalk.green("2.")}${chalk.yellow(
      " Back\n"
    )}${chalk.green("3.")}${chalk.yellow(" Exit\n\n")}${chalk.green("> ")}`
  );

  switch (option) {
    case "1":
    case "r":
    case "R":
      // Refresh the forecast
      await displayForecast(goBackCallback);
      break;

    case "2":
    case "b":
    case "B":
      // Go back
      goBackCallback();
      break;

    case "3":
    case "e":
    case "E":
      // Exit the app
      // process.exit(0);
      runMatrix();
      break;

    default:
      // console.log(
      //   `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1", "r", "R" for Refresh the forecast\n"2", "b", "B" for Go back\n"3", "e", "E" for Exit the app\n`
      // );
      console.log(frameError(
        chalk.red(
          `\nInvalid option:\n\nPlease type in one of the following options:\n\n`
        ) +
          chalk.green(`"1", "r", "R"`) +
          chalk.red(` for Refresh the forecast\n`) +
          chalk.green(`"2", "b", "B"`) +
          chalk.red(` for Go back\n`) +
          chalk.green(`"3", "e", "E"`) +
          chalk.red(` for Exit the app\n`))
      );
      await displayForecast(goBackCallback);
  }
}

// call the function======================================================

// displayForecast();

// exports================================================================

module.exports = { displayForecast };

// =======================================================================
