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

// import the functions from other files======================================================

const { frameError, runMatrix } = require("./common.js");

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
  const option = await askQuestion(
    `\n` +
    chalk.yellow(`Calculator `) +
      chalk.green(`=================================` +
      `>`) +
      chalk.yellow(`\n\nPlease select an option: \n\n`) +
    chalk.green(`1.`) + chalk.yellow(` Calculate a mathematical expression \n`) +
    chalk.green(`2.`) + chalk.yellow(` Convert pixels to REM \n`) +
    chalk.green(`3.`) + chalk.yellow(` Convert REM to pixels \n\n`) +
    chalk.green(`4.`) + chalk.yellow(` Back\n`) +
    chalk.green(`5.`) + chalk.yellow(` Exit \n\n`) +
      chalk.green(`> `)
  );

  switch (option) {
    case "1":
      const expression = await askQuestion(
        `\n` +
        chalk.green(`-`.repeat(44) + `>`) +
          chalk.yellow(`\n\nPlease enter a mathematical expression:`) +
          `\n\n` +
          chalk.green(`> `)
      );
      try {
        const result = math.evaluate(expression);
        console.log(chalk.green(`\n= ${result}\n`));
      } catch (error) {
        // console.log(
        //   "\nInvalid expression:\nMake sure to use proper operators (+, -, *, /) and numbers.\n"
        // );
        console.log(
          frameError(
            chalk.red(
              `\nInvalid expression:\nMake sure to use proper operators `
            ) + chalk.green(`(+, -, *, /) and numbers.\n`)
          )
        );
      }
      await startCalculator(goBackCallback);
      break;

    case "2":
      const px = await askQuestion(
        `\n` +
        chalk.green(`-`.repeat(44) + `>`) +
          `\n\n` +
          chalk.yellow(`Please enter the number of Pixels:`) +
          `\n\n` +
          chalk.green(`> `)
      );
      const rem = pxToRem(Number(px));
      if (isNaN(rem)) {
        // console.log("\nInvalid input for pixels. Please enter a number.\n");
        console.log(
          frameError(
            chalk.red(`\nInvalid input for Pixels. Please enter a `) +
              chalk.green(`number.\n`)
          )
        );
      } else {
        console.log(chalk.green(`\n${px} px = ${rem} rem\n`));
      }
      await startCalculator(goBackCallback);
      break;

    case "3":
      const remInput = await askQuestion(
        `\n` +
        chalk.green(`-`.repeat(44) + `>`) +
          `\n\n` +
          chalk.yellow(`Please enter the number of REM:`) +
          `\n\n` +
          chalk.green(`> `)
      );
      const pxResult = remToPx(Number(remInput));
      if (isNaN(pxResult)) {
        // console.log("\nInvalid input for REM. Please enter a number.\n");
        console.log(
          frameError(
            chalk.red(`\nInvalid input for REM. Please enter a `) +
              chalk.green(`number.\n`)
          )
        );
      } else {
        console.log(chalk.green(`\n${remInput} rem = ${pxResult} px\n`));
      }
      await startCalculator(goBackCallback);
      break;

    case "4":
    case "b":
    case "B":
      goBackCallback();
      break;

    case "5":
    case "e":
    case "E":
      // console.log("\n--------------------------------------------------\n");
      // console.log("\nExiting the app. Goodbye!");
      runMatrix();
      // process.exit(0);
      break;

    default:
      // console.log(
      //   `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1" for Mathematical expression\n"2" for Convert pixels to REM\n"3" for Convert REM to pixels\n"4", "b", "B" for Go back\n"5", "e", "E" for Exit the app\n`
      // );
      console.log(
        frameError(
          ` \n` +
            chalk.red(`Invalid option:`) +
            ` \n \n` +
            chalk.red(`Please type in one of the following options:`) +
            ` \n \n` +
            chalk.green(`"1"`) +
            chalk.red(` for Mathematical expression`) +
            ` \n` +
            chalk.green(`"2"`) +
            chalk.red(` for Convert pixels to REM`) +
            ` \n` +
            chalk.green(`"3"`) +
            chalk.red(` for Convert REM to pixels`) +
            ` \n` +
            chalk.green(`"4", "b", "B"`) +
            chalk.red(` for Go back`) +
            ` \n` +
            chalk.green(`"5", "e", "E"`) +
            chalk.red(` for Exit the app`) +
            ` \n`
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
