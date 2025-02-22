// =============================================================================
//
// project: toolbox/05-to-do.js
// date: 15.02.2024
// to-do list app that uses the readline module to take user input
// and display the to-do list in the console
// and fs.promises to read and write to a file
//
// =============================================================================

// dependencies=================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const readline = require("readline");
const fs = require("fs").promises;
const moment = require("moment");

// imports======================================================================

const { todoFilePath } = require("./config.js");

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
  selectExit,
  selectGoBack,
  selectOption,
  toDoHeader,
  toDoMenu,
  addToDoInterface,
  showToDoInterface,
  invalidInputError,
  goBackError,
  exitError,
  toDoListError,
} = require("./src/common/consoleMessages.js");

// function to start the to-do list app===========================================

async function startToDo(goBackCallback) {
  let toDoList;
  try {
    const data = await fs.readFile(todoFilePath, "utf8");
    toDoList = data.split("\n");
  } catch (err) {
    toDoList = [];
  }

  const location = await getUserLocation();
  const localTime = await getLocalTime(location);
  const option = await askQuestion(
    `\n` +
      (
        await toDoHeader()
      ).toDoHeaderLog +
      ` ${chalk.green(moment(localTime).format("HH:mm:ss"))}` +
      `\n\n` +
      paddingLeft +
      (
        await selectOption()
      ).selectOptionLog +
      `\n\n` +
      (
        await toDoMenu()
      ).toDoMenuLog +
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
      const toDo = await askQuestion(
        (await addToDoInterface()).addToDoInterfaceLog +
          (
            await promptIndicator()
          ).promptIndicatorLog
      );
      toDoList.push(toDo);
      await fs.writeFile(todoFilePath, toDoList.join("\n"));
      startToDo(goBackCallback);
      break;

    case "2":
      console.log((await showToDoInterface()).showToDoInterfaceLog);
      let toDoString = "";
      toDoList.forEach((item, index) => {
        toDoString += chalk.blue(`${index + 1}. ${item}`) + "\n";
      });
      console.log(frameInfo(toDoString));
      startToDo(goBackCallback);
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
            (await toDoListError()).toDoListErrorLog +
            (await goBackError()).goBackErrorLog +
            (await exitError()).exitErrorLog
        )
      );
      startToDo(goBackCallback);
  }
}

// call the function=============================================================

// startToDo();

// exports=======================================================================

module.exports = { startToDo };

// =============================================================================
