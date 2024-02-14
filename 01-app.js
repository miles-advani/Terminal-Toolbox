// =============================================================================
//
// project: toolbox/01-app.js
// date: 14.02.2024
// combining all tools in one file
//
// =============================================================================

// dependencies=================================================================

const readline = require("readline");

// import functions from other files============================================

const { infoApp } = require("./02-info.js");
const { weatherApp } = require("./03-weather.js");
const { calculatorApp } = require("./04-calculator.js");

// function to start the app====================================================

async function startApp() {
  await infoApp();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\nPlease select an option: \n\n1. Weather Forecast \n2. Calculator \n\n> ",
    (answer) => {
      rl.close();
      if (answer === "1") {
        weatherApp();
      } else if (answer === "2") {
        calculatorApp();
      } else {
        console.log(`\nInvalid option:\n\nPlease type in "1" or "2".`);
      }
    }
  );
}

// call the function===========================================================

startApp();

// end of 01-app.js=============================================================
