// ===========================================================================================
//
// project: toolbox/calculator.js
// date: 14.02.2024
// simple calculator that uses the math.js library
// to perform basic operations like addition, subtraction,
// multiplication, and division.
// and px to rem conversion / rem to px conversion
// taking user input from the command line
// using the console.log to display the results
//
// ===========================================================================================

// dependencies================================================================

const readline = require("readline");
const math = require("mathjs");

// insert functions here or import them from common.js==========================

// const { calculate, convertPxToRem, convertRemToPx } = require("./common.js");

// function for converting px to rem===========================================
// ============================================================================

// Function to convert pixels to rem
function pxToRem(px, baseSize = 16) {
  return px / baseSize;
}

// Function to convert rem to pixels
function remToPx(rem, baseSize = 16) {
  return rem * baseSize;
}

// Function to ask a question and get user input
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

// Function to start the calculator
async function start() {
  const option = await askQuestion(
    "Please select an option: \n1. Calculate a mathematical expression \n2. Convert pixels to REM \n3. Convert REM to pixels \n"
  );

  switch (option) {
    case "1":
      const expression = await askQuestion(
        "Please enter a mathematical expression: "
      );
      try {
        const result = math.evaluate(expression);
        console.log(`The result is: ${result}`);
      } catch (error) {
        console.log("Invalid expression");
      }
      break;

    case "2":
      const px = await askQuestion(
        "Please enter the number of pixels you want to convert to REM: "
      );
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        console.log("Invalid input for pixels");
      } else {
        console.log(`${px} pixels is equal to ${rem} REM.`);
      }
      break;

    case "3":
      const remInput = await askQuestion(
        "Please enter the number of REM you want to convert to pixels: "
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        console.log("Invalid input for REM");
      } else {
        console.log(`${remInput} REM is equal to ${pxResult} pixels.`);
      }
      break;

    default:
      console.log("Invalid option");
      break;
  }
}

// Call the start function to begin the calculator
start();

// end of calculator.js=========================================================

// exports======================================================================

module.exports.startCalculator = function startCalculator() {
  start();
};

// ==============================================================================
