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

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const readline = require("readline");
const math = require("mathjs");
const moment = require("moment");

// imports===================================================================================

const {
  getUserLocation,
  getLocalTime,
  frameError,
  frameInfo,
  runMatrix,
} = require("./common.js");

const {
  paddingLeft,
  promptIndicator,
  selectOption,
  selectGoBack,
  selectExit,
  calculatorHeader,
  calculatorMenu,
  calculationsInterface,
  pxToRemInterface,
  remToPxInterface,
  invalidInputError,
  remToPxError,
  calculatorError,
  goBackError,
  exitError,
  calculationsError,
} = require("./src/common/consoleMessages.js");

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

async function startCalculator(goBackCallback) {
  const location = await getUserLocation();
  const localTime = await getLocalTime(location);
  const option = await askQuestion(
    `\n` +
      calculatorHeader() +
      ` ${chalk.green(moment(localTime).format("HH:mm:ss"))}` +
      `\n\n` +
      paddingLeft +
      selectOption() +
      `\n\n` +
      calculatorMenu() +
      `\n\n` +
      paddingLeft +
      selectGoBack() +
      `\n` +
      paddingLeft +
      selectExit() +
      `\n\n` +
      promptIndicator()
  );

  switch (option) {
    case "1":
      const expression = await askQuestion(
        calculationsInterface() + promptIndicator()
      );
      try {
        const result = math.evaluate(expression);
        console.log(frameInfo(`\n` + chalk.green(`= ${result}`) + `\n`));
      } catch (error) {
        console.log(
          frameError(
            invalidInputError() +
              calculationsError()
          )
        );
      }
      await startCalculator(goBackCallback);
      break;

    case "2":
      const px = await askQuestion(pxToRemInterface() + promptIndicator());
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        console.log(
          frameError(
            invalidInputError() +
              remToPxError()
          )
        );
      } else {
        console.log(frameInfo(chalk.green(`\n${px} px = ${rem} rem\n`)));
      }
      await startCalculator(goBackCallback);
      break;

    case "3":
      const remInput = await askQuestion(
        remToPxInterface() + promptIndicator()
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        console.log(frameError(invalidInputError() + remToPxError()));
      } else {
        console.log(
          frameInfo(chalk.green(`\n${remInput} rem = ${pxResult} px\n`))
        );
      }
      await startCalculator(goBackCallback);
      break;

    case "b":
    case "B":
      goBackCallback();
      break;

    case "e":
    case "E":
      // console.log("\n--------------------------------------------------\n");
      // console.log("\nExiting the app. Goodbye!");
      runMatrix();
      // process.exit(0);
      break;

    default:
      console.log(
        frameError(
          invalidInputError() + calculatorError() + goBackError() + exitError()
        )
      );
      await startCalculator(goBackCallback);
      break;
  }
}

// Call the function============================================================

// startCalculator();

// exports======================================================================

module.exports = { startCalculator };

// ==============================================================================
