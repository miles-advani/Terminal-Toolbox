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

const {
  menuColor,
  outputColor,
  textColor,
  errorColor,
} = require("/Users/miles/dci/projects/javascript-projects/toolbox/config.js");

// menu========================================================================
// prompt Indicator=====================
async function promptIndicator() {
  const outputColorValue = await outputColor();
  return {
    promptIndicatorLog: outputColorValue(`> `),
  };
}
// padding left=========================
const paddingLeft = ` `.repeat(5);
// select option========================
async function selectOption() {
  const menuColorValue = await menuColor();
  return {
    selectOptionLog: menuColorValue(`Please select an option:`),
  };
}
// refresh==============================
async function selectRefresh() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectRefreshLog: outputColorValue(`r `) + menuColorValue(`Refresh`),
  };
}
// back=================================
async function selectGoBack() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectGoBackLog: outputColorValue(`b `) + menuColorValue(`Back`),
  };
}
// exit=================================
async function selectExit() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectExitLog: outputColorValue(`e `) + menuColorValue(`Exit`),
  };
}
// weather==============================
async function selectWeather() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectWeatherLog:
      outputColorValue(`1 `) + menuColorValue(`Weather Forecast`),
  };
}
// weather header
async function weatherHeader() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    weatherHeaderLog:
      menuColorValue(`Weather `) + outputColorValue(`=`.repeat(35) + `>>`),
  };
}
// weather border
async function weatherBorder() {
  const outputColorValue = await outputColor();
  return {
    weatherBorderLog: outputColorValue(`-`.repeat(35)),
  };
}
// calculator===========================
async function selectCalculator() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectCalculatorLog: outputColorValue(`2 `) + menuColorValue(`Calculator`),
  };
}
// calculator header
async function calculatorHeader() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    calculatorHeaderLog:
      menuColorValue(`Calculator `) + outputColorValue(`=`.repeat(32) + `>>`),
  };
}
// calculator menu
async function calculatorMenu() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    calculatorMenuLog:
      paddingLeft +
      outputColorValue(`1 `) +
      menuColorValue(`Calculations`) +
      `\n` +
      paddingLeft +
      outputColorValue(`2 `) +
      menuColorValue(`PX to REM`) +
      `\n` +
      paddingLeft +
      outputColorValue(`3 `) +
      menuColorValue(`REM to PX`),
  };
}
// calculations interface
async function calculationsInterface() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    calculationsInterfaceLog:
      `\n` +
      menuColorValue(`Calculations `) +
      outputColorValue(`-`.repeat(29) + `>>>`) +
      `\n\n` +
      menuColorValue(paddingLeft + `Please enter a math expression:`) +
      `\n\n`,
  };
}
// px to rem interface
async function pxToRemInterface() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    pxToRemInterfaceLog:
      `\n` +
      menuColorValue(`PX To REM `) +
      outputColorValue(`-`.repeat(32) + `>>>`) +
      `\n\n` +
      menuColorValue(paddingLeft + `Please enter the number of Pixels:`) +
      `\n\n`,
  };
}
// rem to px interface
async function remToPxInterface() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    remToPxInterfaceLog:
      `\n` +
      menuColorValue(`REM To PX `) +
      outputColorValue(`-`.repeat(32) + `>>>`) +
      `\n\n` +
      menuColorValue(paddingLeft + `Please enter the number of REM:`) +
      `\n\n`,
  };
}
// to do list===========================
async function selectToDoList() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectToDoListLog: outputColorValue(`3 `) + menuColorValue(`To Do List`),
  };
}
// to do header
async function toDoHeader() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    toDoHeaderLog:
      menuColorValue(`To Do List `) + outputColorValue(`=`.repeat(32) + `>>`),
  };
}
// to do menu
async function toDoMenu() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    toDoMenuLog:
      paddingLeft +
      outputColorValue(`1 `) +
      menuColorValue(`Add a to-do`) +
      `\n` +
      paddingLeft +
      outputColorValue(`2 `) +
      menuColorValue(`Show to-do list`),
  };
}
// add to do interface
async function addToDoInterface() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    addToDoInterfaceLog:
      `\n` +
      menuColorValue(`Add To Do `) +
      outputColorValue(`-`.repeat(32) + `>>>`) +
      `\n\n` +
      menuColorValue(paddingLeft + `Please enter a to-do:`) +
      `\n\n`,
  };
}
// show to do list interface
async function showToDoInterface() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    showToDoInterfaceLog:
      `\n` +
      menuColorValue(`To Do's `) +
      outputColorValue(`-`.repeat(34) + `>>>`) +
      `\n`,
  };
}
// random joke==========================
async function selectRandomJoke() {
  const outputColorValue = await outputColor();
  const menuColorValue = await menuColor();
  return {
    selectRandomJokeLog: outputColorValue(`4 `) + menuColorValue(`Random Joke`),
  };
}
// error messages================================================================
// invalid Input Error=================
async function invalidInputError() {
  const errorColorValue = await errorColor();
  return {
    invalidInputErrorLog: errorColorValue(
      `\nInvalid Input:\n\nPlease type in one of the following options:\n\n`
    ),
  };
}
// refresh error========================
async function refreshError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    refreshErrorLog:
      outputColorValue(`"r", "R"`) + errorColorValue(` for Refresh\n`),
  };
}
// go back error========================
async function goBackError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    goBackErrorLog:
      outputColorValue(`"b", "B"`) + errorColorValue(` for Go back\n`),
  };
}
// exit error===========================
async function exitError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    exitErrorLog: outputColorValue(`"e", "E"`) + errorColorValue(` for Exit\n`),
  };
}
// app manager error====================
async function appManagerError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    appManagerErrorLog:
      outputColorValue(`"1", "w", "W"`) +
      errorColorValue(` for Weather Forecast\n`) +
      outputColorValue(`"2", "c", "C"`) +
      errorColorValue(` for Calculator\n`) +
      outputColorValue(`"3", "t", "T"`) +
      errorColorValue(` for To Do List\n`) +
      outputColorValue(`"4", "j", "J"`) +
      errorColorValue(` for Random Joke\n`),
  };
}
// calculator error=====================
async function calculatorError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    calculatorErrorLog:
      outputColorValue(`"1"`) +
      errorColorValue(` for Mathematical expression\n`) +
      outputColorValue(`"2"`) +
      errorColorValue(` for Convert pixels to REM\n`) +
      outputColorValue(`"3"`) +
      errorColorValue(` for Convert REM to pixels\n`),
  };
}
// calculations error
async function calculationsError() {
  const outputColorValue = await outputColor();
  return {
    calculationsErrorLog: outputColorValue(`(+, -, *, /) and numbers`) + `\n`,
  };
}
// rem to px error
async function remToPxError() {
  const outputColorValue = await outputColor();
  return {
    remToPxErrorLog: outputColorValue(`number`) + `\n`,
  };
}
// to do list error======================
async function toDoListError() {
  const outputColorValue = await outputColor();
  const errorColorValue = await errorColor();
  return {
    toDoListErrorLog:
      outputColorValue(`"1"`) +
      errorColorValue(` for Add a to-do`) +
      ` \n` +
      outputColorValue(`"2"`) +
      errorColorValue(` for Show to-do list`) +
      ` \n`,
  };
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
