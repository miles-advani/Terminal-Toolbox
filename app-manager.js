// In a new file, e.g., appManager.js

// dependencies=================================================================

const readline = require("readline");

// import the functions from other files==========================================

// const { infoApp } = require("./02-info.js");
const { displayInfo } = require("./02-info.js");
const { displayForecast } = require("./03-weather.js");
const { start, startCalculator } = require("./04-calculator.js");
const { startToDo } = require("./05-to-do.js");
const { displayJoke } = require("./07-joke.js");
const { runMatrix } = require("./common.js");

// function to start the app=======================================================

async function startApp() {
  await displayInfo();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\nPlease select an option: \n\n1. Weather Forecast \n2. Calculator\n3. To Do List\n4. Random Joke\n\n5. Refresh\n6. Exit \n\n> ",
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
          `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1", "w", "W" for Weather Forecast\n"2", "c", "C" for Calculator\n"3", "t", "T" for To Do List\n"4", "j", "J" for Random Joke\n"5", "r", "R" for Reload\n"6", "e", "E" for Exit\n`
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
