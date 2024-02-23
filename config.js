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

// API key's====================================================================

const API_KEY = "041f4450ac99bf471f1cf38b20fa6daa"; // openweathermap.org / 02-info.js / 03-weather.js

// file paths===================================================================

// const todoFilePath = "todoList.md"; // 05-to-do.js
const todoFilePath = "/Users/miles/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian/to-do-test.md"; // 05-to-do.js

// exports======================================================================

module.exports = {
  API_KEY,
  todoFilePath,
};

// =============================================================================

// ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian/to-do-test.md