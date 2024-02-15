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
    "\nPlease select an option: \n\n1. Weather Forecast \n2. Calculator\n3. To Do List\n4. Random Joke\n\nr. Reload\ne. Exit \n\n> ",
    (answer) => {
      rl.close();
      if (answer === "1" || answer === "w") {
        displayForecast();
      } else if (answer === "2" || answer === "c") {
        startCalculator(startApp);
      } else if (answer === "3" || answer === "t") {
        startToDo(startApp);
      } else if (answer === "4" || answer === "j") {
        displayJoke();
      } else if (answer === "r") {
        startApp();
      } else if (answer === "e") {
        // console.log("\nExiting the app. Goodbye!");
        runMatrix();
        // process.exit(0);
      } else {
        console.log(`\nInvalid option:\n\nPlease type in "1" or "2".\n`);
      }
    }
  );
}

// call the function=============================================================

startApp();

// exports=======================================================================

// module.exports = { startApp };

// =============================================================================
