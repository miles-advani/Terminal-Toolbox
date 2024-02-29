// =============================================================================
//
// project: toolbox/app-manager.js
// date: 15.02.2024
// main file that starts the app and displays the menu
// using the readline module to take user input
// and chalk to style the output
// and the functions/Apps from other files
//
// =============================================================================

// dependencies=================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const readline = require("readline");

// imports======================================================================

const { displayInfo } = require("./02-info.js");
const { displayForecast } = require("./03-weather.js");
const { startCalculator } = require("./04-calculator.js");
const { startToDo } = require("./05-to-do.js");
const { displayJoke } = require("./07-joke.js");
const { runMatrix, frameError } = require("./common.js");
const {
  paddingLeft,
  promptIndicator,
  selectOption,
  selectRefresh,
  selectExit,
  selectWeather,
  selectCalculator,
  selectToDoList,
  selectRandomJoke,
  invalidInputError,
  refreshError,
  exitError,
  appManagerError,
} = require("./src/common/consoleMessages.js");

// function to start the app=======================================================

async function startApp() {
  await displayInfo();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `\n` +
      paddingLeft +
      (await selectOption()).selectOptionLog +
      `\n\n` +
      paddingLeft +
      (await selectWeather()).selectWeatherLog +
      `\n` +
      paddingLeft +
      (await selectCalculator()).selectCalculatorLog +
      `\n` +
      paddingLeft +
      (await selectToDoList()).selectToDoListLog +
      `\n` +
      paddingLeft +
      (await selectRandomJoke()).selectRandomJokeLog +
      `\n\n` +
      paddingLeft +
      (await selectRefresh()).selectRefreshLog +
      `\n` +
      paddingLeft +
      (await selectExit()).selectExitLog +
      `\n\n` +
      (await promptIndicator()).promptIndicatorLog,

    async (answer) => {
      rl.close();
      if (answer === "1" || answer === "w" || answer === "W") {
        displayForecast(startApp);
      } else if (answer === "2" || answer === "c" || answer === "C") {
        startCalculator(startApp);
      } else if (answer === "3" || answer === "t" || answer === "T") {
        startToDo(startApp);
      } else if (answer === "4" || answer === "j" || answer === "J") {
        displayJoke(startApp);
      } else if (answer === "r" || answer === "R") {
        startApp();
      } else if (answer === "e" || answer === "E") {
        // console.log("\nExiting the app. Goodbye!");
        runMatrix();
        // process.exit(0);
      } else {
  console.log(
    frameError(
      (await invalidInputError()).invalidInputErrorLog +
      (await appManagerError()).appManagerErrorLog +
      (await refreshError()).refreshErrorLog +
      (await exitError()).exitErrorLog
    )
  );
  startApp();
}
    }
  );
}

// call the function=============================================================

startApp();

// =============================================================================
