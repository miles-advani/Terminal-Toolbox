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
// ==========================================================================================

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
  askQuestion,
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

// Function to start the calculator=============================================================

async function startCalculator(goBackCallback) {
  const location = await getUserLocation();
  const localTime = await getLocalTime(location);
  const option = await askQuestion(
    `\n` +
      (
        await calculatorHeader()
      ).calculatorHeaderLog +
      ` ${chalk.green(moment(localTime).format("HH:mm:ss"))}` +
      `\n\n` +
      paddingLeft +
      (
        await selectOption()
      ).selectOptionLog +
      `\n\n` +
      (
        await calculatorMenu()
      ).calculatorMenuLog +
      `\n\n` +
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
    case "1":
      const expression = await askQuestion(
        (await calculationsInterface()).calculationsInterfaceLog +
          (
            await promptIndicator()
          ).promptIndicatorLog
      );
      try {
        const result = math.evaluate(expression);
        console.log(frameInfo(`\n` + chalk.green(`= ${result}`) + `\n`));
      } catch (error) {
        console.log(
          frameError(
            (await invalidInputError()).invalidInputErrorLog +
              (await calculationsError()).calculationsErrorLog
          )
        );
      }
      await startCalculator(goBackCallback);
      break;

    case "2":
      const px = await askQuestion(
        (await pxToRemInterface()).pxToRemInterfaceLog +
          (
            await promptIndicator()
          ).promptIndicatorLog
      );
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        console.log(
          frameError(
            (await invalidInputError()).invalidInputErrorLog +
              (await remToPxError()).remToPxErrorLog
          )
        );
      } else {
        console.log(frameInfo(chalk.green(`\n${px} px = ${rem} rem\n`)));
      }
      await startCalculator(goBackCallback);
      break;

    case "3":
      const remInput = await askQuestion(
        (await remToPxInterface()).remToPxInterfaceLog +
          (
            await promptIndicator()
          ).promptIndicatorLog
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        console.log(
          frameError(
            (await invalidInputError()).invalidInputErrorLog +
              (await remToPxError()).remToPxErrorLog
          )
        );
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
          (await invalidInputError()).invalidInputErrorLog +
            (await calculatorError()).calculatorErrorLog +
            (await goBackError()).goBackErrorLog +
            (await exitError()).exitErrorLog
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
