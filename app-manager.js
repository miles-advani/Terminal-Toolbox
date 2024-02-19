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

// const { infoApp } = require("./02-info.js");
const { displayInfo } = require("./02-info.js");
const { displayForecast } = require("./03-weather.js");
const { startCalculator } = require("./04-calculator.js");
const { startToDo } = require("./05-to-do.js");
const { displayJoke } = require("./07-joke.js");
const { runMatrix, frameError } = require("./common.js");

// function to start the app=======================================================

async function startApp() {
  await displayInfo();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `\n` +
      ` `.repeat(5) +
      chalk.yellow(`Please select an option: \n\n`) +
      ` `.repeat(5) +
      chalk.green(`1.`) +
      chalk.yellow(` Weather Forecast \n`) +
      ` `.repeat(5) +
      chalk.green(`2.`) +
      chalk.yellow(` Calculator\n`) +
      ` `.repeat(5) +
      chalk.green(`3.`) +
      chalk.yellow(` To Do List\n`) +
      ` `.repeat(5) +
      chalk.green(`4.`) +
      chalk.yellow(` Random Joke\n\n`) +
      ` `.repeat(5) +
      chalk.green(`5.`) +
      chalk.yellow(` Refresh\n`) +
      ` `.repeat(5) +
      chalk.green(`6.`) +
      chalk.yellow(` Exit \n\n`) +
      chalk.green(`> `),

    (answer) => {
      rl.close();
      if (answer === "1" || answer === "w" || answer === "W") {
        displayForecast(startApp);
      } else if (answer === "2" || answer === "c" || answer === "C") {
        startCalculator(startApp);
      } else if (answer === "3" || answer === "t" || answer === "T") {
        startToDo(startApp);
      } else if (answer === "4" || answer === "j" || answer === "J") {
        displayJoke(startApp);
      } else if (answer === "5" || answer === "r" || answer === "R") {
        startApp();
      } else if (answer === "6" || answer === "e" || answer === "E") {
        // console.log("\nExiting the app. Goodbye!");
        runMatrix();
        // process.exit(0);
      } else {
        console.log(
          frameError(
            chalk.red(
              `\nInvalid option:\n\nPlease type in one of the following options:\n\n`
            ) +
              chalk.green(`"1", "w", "W"`) +
              chalk.red(` for Weather Forecast\n`) +
              chalk.green(`"2", "c", "C"`) +
              chalk.red(` for Calculator\n`) +
              chalk.green(`"3", "t", "T"`) +
              chalk.red(` for To Do List\n`) +
              chalk.green(`"4", "j", "J"`) +
              chalk.red(` for Random Joke\n`) +
              chalk.green(`"5", "r", "R"`) +
              chalk.red(` for Refresh\n`) +
              chalk.green(`"6", "e", "E"`) +
              chalk.red(` for Exit\n`)
          )
        );
        startApp();
      }
    }
  );
}

// call the function=============================================================

startApp();

// exports=======================================================================

// module.exports = { startApp };

// =============================================================================
