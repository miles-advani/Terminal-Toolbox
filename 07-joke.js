// ==================================================================================
//
// project: toolbox/07-joke.js
// date: 15.02.2024
// displays a random dev joke from the icanhazdadjoke.com api
// using the axios library
//
// ================================================================================

// dependencies====================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const axios = require("axios");
const readline = require("readline");

// import the functions from other files============================================

const { frameError, runMatrix } = require("./common.js");

// function to get a random joke from the icanhazdadjoke.com api=====================

async function getJoke() {
  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    return response.data.joke;
  } catch (error) {
    console.error(error);
  }
}

// function to display the joke=====================================================

// async function displayJoke() {
//   const joke = await getJoke();
//   console.log("\n", joke);
// }

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

async function displayJoke(goBackCallback) {
  const joke = await getJoke();
  console.log("\n", chalk.green(joke));

  const option = await askQuestion(
    `${chalk.yellow("\nPlease select an option: \n\n")}${chalk.green(
      "1."
    )}${chalk.yellow(" Refresh \n")}${chalk.green("2.")}${chalk.yellow(
      " Back\n"
    )}${chalk.green("3.")}${chalk.yellow(" Exit\n\n")}${chalk.green("> ")}`
  );

  switch (option) {
    case "1":
    case "r":
    case "R":
      // Refresh the joke
      await displayJoke(goBackCallback);
      break;

    case "2":
    case "b":
    case "B":
      // Go back
      goBackCallback();
      break;

    case "3":
    case "e":
    case "E":
      // Exit the app
      // process.exit(0);
      runMatrix();
      break;

    default:
      console.log(
        frameError(
          ` \n` +
            chalk.red(`Invalid option:`) +
            ` \n \n` +
            chalk.red(`Please type in one of the following options:`) +
            ` \n \n` +
            chalk.green(`"1"`) +
            chalk.red(` for Refresh the joke`) +
            ` \n` +
            chalk.green(`"2"`) +
            chalk.red(` for Go back`) +
            ` \n` +
            chalk.green(`"3"`) +
            chalk.red(` for Exit the app`) +
            ` \n`
        )
      );
      await displayJoke(goBackCallback);
  }
}

// call the function================================================================

// displayJoke();

// export the function==============================================================

module.exports = { displayJoke };
