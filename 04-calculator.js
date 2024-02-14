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

// dependencies==============================================================================

const readline = require("readline");
const math = require("mathjs");

// Function to convert pixels to rem===========================================================

function pxToRem(px, baseSize = 16) {
  return px / baseSize;
}

// Function to convert rem to pixels===========================================================

function remToPx(rem, baseSize = 16) {
  return rem * baseSize;
}

// Function to ask a question and get user input================================================

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

// Function to start the calculator=============================================================

async function start() {
  const option = await askQuestion(
    "\n--------------------------------------------------\n\nPlease select an option: \n\n1. Calculate a mathematical expression \n2. Convert pixels to REM \n3. Convert REM to pixels \n4. Exit \n\n> "
  );

  switch (option) {
    case "1":
      const expression = await askQuestion(
        "\n--------------------------------------------------\n\nPlease enter a mathematical expression:\n\n> "
      );
      try {
        const result = math.evaluate(expression);
        console.log(`\nThe result is: ${result}`);
      } catch (error) {
        console.log("\nInvalid expression");
      }
      break;

    case "2":
      const px = await askQuestion(
        "\n--------------------------------------------------\n\nPlease enter the number of pixels you want to convert to REM:\n\n> "
      );
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        console.log("\nInvalid input for pixels");
      } else {
        console.log(`\n${px} pixels is equal to ${rem} REM.`);
      }
      break;

    case "3":
      const remInput = await askQuestion(
        "\n--------------------------------------------------\n\nPlease enter the number of REM you want to convert to pixels:\n\n> "
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        console.log("\nInvalid input for REM");
      } else {
        console.log(`\n${remInput} REM is equal to ${pxResult} pixels.`);
      }
      break;

      case "4":
        console.log("\n--------------------------------------------------\n");
        console.log("\nExiting the app. Goodbye!");
        process.exit(0);
        break;

    default:
      console.log(`\nInvalid option:\n\nPlease type in "1", "2" or "3".`);
      break;
  }
}

// Call the start function to begin the calculator
// start();

// end of calculator.js=========================================================

// exports======================================================================

module.exports.calculatorApp = function calculatorApp() {
  start();
};

// ==============================================================================
