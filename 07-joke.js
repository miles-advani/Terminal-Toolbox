// ==================================================================================
//
// project: toolbox/07-joke.js
// date: 15.02.2024
// displays a random dev joke from the icanhazdadjoke.com api
// using the axios library
//
// ================================================================================

// dependencies====================================================================

const axios = require("axios");
const { mod } = require("mathjs");
const readline = require("readline");

// import the functions from other files============================================

const { runMatrix } = require("./common.js");

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
  console.log("\n", joke);

  const option = await askQuestion(
    "\nPlease select an option:\n\n1: Refresh\n2: Back \n3: Exit \n\n> "
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
        `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1", "r", "R" for Refresh the joke\n"2", "b", "B" for Go back\n"3", "e", "E" for Exit the app\n`
      );
      await displayJoke(goBackCallback);
  }
}

// call the function================================================================

// displayJoke();

// export the function==============================================================

module.exports = { displayJoke };
