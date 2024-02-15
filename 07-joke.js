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

async function displayJoke() {
  const joke = await getJoke();
  console.log("\n", joke);
}

// call the function================================================================

// displayJoke();

// export the function==============================================================

module.exports = { displayJoke };
