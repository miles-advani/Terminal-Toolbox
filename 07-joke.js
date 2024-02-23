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

const { frameError, frameInfo, runMatrix } = require("./common.js");
const {
  paddingLeft,
  selectOption,
  selectRefresh,
  selectGoBack,
  selectExit,
  promptIndicator,
  invalidInputError,
  refreshError,
  goBackError,
  exitError,
} = require("./src/common/consoleMessages.js");

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
  console.log(frameInfo(chalk.green(joke)));

  const option = await askQuestion(
    `\n` +
      paddingLeft +
      selectOption() +
      `\n\n` +
      paddingLeft +
      selectRefresh() +
      `\n` +
      paddingLeft +
      selectGoBack() +
      `\n` +
      paddingLeft +
      selectExit() +
      `\n\n` +
      promptIndicator()
  );

  switch (option) {
    case "r":
    case "R":
      // Refresh the joke
      await displayJoke(goBackCallback);
      break;

    case "b":
    case "B":
      // Go back
      goBackCallback();
      break;

    case "e":
    case "E":
      // Exit the app
      // process.exit(0);
      runMatrix();
      break;

    default:
      console.log(
        frameError(
          invalidInputError() + refreshError() + goBackError() + exitError()
        )
      );
      await displayJoke(goBackCallback);
  }
}

// call the function================================================================

// displayJoke();

// export the function==============================================================

module.exports = { displayJoke };

// ================================================================================
