// console.log's===============================================================

// ============================================================================

// dependencies================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

let stripAnsi;
import("strip-ansi").then((module) => {
  stripAnsi = module.default;
});

// imports======================================================================

// const { colorOne, } = require("./config.js");
// import changeColor from "./test.js";

// const {changeColor} = require("/Users/miles/dci/projects/javascript-projects/toolbox/test.js");

// menu========================================================================
// prompt Indicator=====================
function promptIndicator() {
  return chalk.green("> ");
}
// padding left=========================
const paddingLeft = ` `.repeat(5);
// select option========================
function selectOption() {
  return chalk.yellow(`Please select an option:`);
}
// refresh==============================
function selectRefresh() {
  return chalk.green(`r `) + chalk.yellow(`Refresh`);
}
// back=================================
function selectGoBack() {
  return chalk.green(`b `) + chalk.yellow(`Back`);
}
// exit=================================
function selectExit() {
  return chalk.green(`e `) + chalk.yellow(`Exit`);
}
// weather==============================
function selectWeather() {
  return chalk.green(`1 `) + chalk.yellow(`Weather Forecast`);
}
// weather header
function weatherHeader() {
  return chalk.yellow(`Weather `) + chalk.green(`=`.repeat(35) + `>>`);
}
// weather border
function weatherBorder() {
  return chalk.green(`-`.repeat(35));
}
// calculator===========================
function selectCalculator() {
  return chalk.green(`2 `) + chalk.yellow(`Calculator`);
}
// calculator header
function calculatorHeader() {
  return chalk.yellow(`Calculator `) + chalk.green(`=`.repeat(32) + `>>`);
}
// calculator menu
function calculatorMenu() {
  return (
    paddingLeft +
    chalk.green(`1.`) +
    chalk.yellow(` Calculations `) +
    `\n` +
    paddingLeft +
    chalk.green(`2.`) +
    chalk.yellow(` PX to REM `) +
    `\n` +
    paddingLeft +
    chalk.green(`3.`) +
    chalk.yellow(` REM to PX `)
  );
}
// calculations interface
function calculationsInterface() {
  return (
    `\n` +
    chalk.yellow(`Calculations `) +
    chalk.green(`-`.repeat(29) + `>>>`) +
    `\n\n` +
    chalk.yellow(paddingLeft + `Please enter a math expression:`) +
    `\n\n`
  );
}
// px to rem interface
function pxToRemInterface() {
  return (
    `\n` +
    chalk.yellow(`PX To REM `) +
    chalk.green(`-`.repeat(32) + `>>>`) +
    `\n\n` +
    chalk.yellow(paddingLeft + `Please enter the number of Pixels:`) +
    `\n\n`
  );
}
// rem to px interface
function remToPxInterface() {
  return (
    `\n` +
    chalk.yellow(`REM To PX `) +
    chalk.green(`-`.repeat(32) + `>>>`) +
    `\n\n` +
    chalk.yellow(paddingLeft + `Please enter the number of REM:`) +
    `\n\n`
  );
}
// to do list===========================
function selectToDoList() {
  return chalk.green(`3 `) + chalk.yellow(`To Do List`);
}
// to do header
function toDoHeader() {
  return chalk.yellow(`To Do List `) + chalk.green(`=`.repeat(32) + `>>`);
}
// to do menu
function toDoMenu() {
  return (
    paddingLeft +
    chalk.green(`1.`) +
    chalk.yellow(` Add a to-do `) +
    `\n` +
    paddingLeft +
    chalk.green(`2.`) +
    chalk.yellow(` Show to-do list `)
  );
}
// add to do interface
function addToDoInterface() {
  return (
    `\n` +
    chalk.yellow(`Add To Do `) +
    chalk.green(`-`.repeat(32) + `>>>`) +
    `\n\n` +
    chalk.yellow(paddingLeft + `Please enter a to-do:`) +
    `\n\n`
  );
}
// show to do list interface
function showToDoInterface() {
  return (
    `\n` + chalk.yellow(`To Do's `) + chalk.green(`-`.repeat(34) + `>>>`) + `\n`
  );
}
// random joke==========================
function selectRandomJoke() {
  return chalk.green(`4 `) + chalk.yellow(`Random Joke`);
}

// error messages================================================================
// invalid Input Error=================
function invalidInputError() {
  return chalk.red(
    `\nInvalid Input:\n\nPlease type in one of the following options:\n\n`
  );
}
// refresh error========================
function refreshError() {
  return chalk.green(`"r", "R"`) + chalk.red(` for Refresh\n`);
}
// go back error========================
function goBackError() {
  return chalk.green(`"b", "B"`) + chalk.red(` for Go back\n`);
}
// exit error===========================
function exitError() {
  return chalk.green(`"e", "E"`) + chalk.red(` for Exit\n`);
}
// app manager error====================
function appManagerError() {
  return (
    chalk.green(`"1", "w", "W"`) +
    chalk.red(` for Weather Forecast\n`) +
    chalk.green(`"2", "c", "C"`) +
    chalk.red(` for Calculator\n`) +
    chalk.green(`"3", "t", "T"`) +
    chalk.red(` for To Do List\n`) +
    chalk.green(`"4", "j", "J"`) +
    chalk.red(` for Random Joke\n`)
  );
}
// calculator error=====================
function calculatorError() {
  return (
    chalk.green(`"1"`) +
    chalk.red(` for Mathematical expression`) +
    ` \n` +
    chalk.green(`"2"`) +
    chalk.red(` for Convert pixels to REM`) +
    ` \n` +
    chalk.green(`"3"`) +
    chalk.red(` for Convert REM to pixels`) +
    ` \n`
  );
}
// calculations error
function calculationsError() {
  return chalk.green(`(+, -, *, /) and numbers`) + `\n`;
}
// rem to px error
function remToPxError() {
  return chalk.green(`number`) + `\n`;
}
// to do list error======================
function toDoListError() {
  return (
    chalk.green(`"1"`) +
    chalk.red(` for Add a to-do`) +
    ` \n` +
    chalk.green(`"2"`) +
    chalk.red(` for Show to-do list`) +
    ` \n`
  );
}

// exports====================================================================

module.exports = {
  paddingLeft,
  promptIndicator,
  selectOption,
  selectRefresh,
  selectGoBack,
  selectExit,
  selectWeather,
  selectCalculator,
  selectToDoList,
  selectRandomJoke,
  weatherHeader,
  weatherBorder,
  calculatorHeader,
  calculatorMenu,
  calculationsInterface,
  pxToRemInterface,
  remToPxInterface,
  toDoHeader,
  toDoMenu,
  addToDoInterface,
  showToDoInterface,
  invalidInputError,
  refreshError,
  goBackError,
  exitError,
  appManagerError,
  calculatorError,
  calculationsError,
  remToPxError,
  toDoListError,
};

// ============================================================================
