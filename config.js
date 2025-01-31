// =============================================================================
//
// project: toolbox/config.js
// date: 15.02.2024
// config.js is a simple file that exports the API key
// for the openweathermap.org API. It is imported in the other files
// where the API key is needed. This way, the API key is only stored
// in one place and can be easily changed if necessary.
//
// =============================================================================

require('dotenv').config();

// API key's====================================================================

// const API_KEY = "secret"; // openweathermap.org / 02-info.js / 03-weather.js (default)
const API_KEY = process.env.API_KEY;

// file path's==================================================================

// const todoFilePath = "todoList.md"; // 05-to-do.js (default)
const todoFilePath =
  "/Users/miles/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian/to-do-test.md"; // 05-to-do.js

// change colors================================================================

async function menuColor() {
  const chalk = (await import("chalk")).default;
  return chalk.yellow;
}

async function outputColor() {
  const chalk = (await import("chalk")).default;
  return chalk.green;
}

async function textColor() {
  const chalk = (await import("chalk")).default;
  return chalk.blue;
}

async function errorColor() {
  const chalk = (await import("chalk")).default;
  return chalk.red;
}

// exports======================================================================

module.exports = {
  API_KEY,
  todoFilePath,
  menuColor,
  outputColor,
  textColor,
  errorColor,
};

// =============================================================================

// ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian/to-do-test.md
