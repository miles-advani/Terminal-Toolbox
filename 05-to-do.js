// =============================================================================
//
// project: toolbox/05-to-do.js
// date: 15.02.2024
// to-do list app that uses the readline module to take user input
// and display the to-do list in the console
//
// =============================================================================

// dependencies=================================================================

let chalk;
import("chalk").then((module) => {
  chalk = module.default;
});

const readline = require("readline");
const fs = require("fs").promises;

// import the functions from other files==========================================

const { frameError, runMatrix } = require("./common.js");

// function to ask a question and get user input==================================

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

// function to start the to-do list app===========================================

async function startToDo(goBackCallback) {
  let toDoList;
  try {
    const data = await fs.readFile("todoList.txt", "utf8");
    toDoList = data.split("\n");
  } catch (err) {
    toDoList = [];
  }

  const option = await askQuestion(
    `\n` +
    chalk.yellow(`To Do List `) +
      chalk.green(`=`.repeat(33) +
      `>`) +
      chalk.yellow(`\n\nPlease select an option: \n\n`) +
      chalk.green(`1.`) +
      chalk.yellow(` Add a to-do \n`) +
      chalk.green(`2.`) +
      chalk.yellow(` Show to-do list \n\n`) +
      chalk.green(`3.`) +
      chalk.yellow(` Back \n`) +
      chalk.green(`4.`) +
      chalk.yellow(` Exit\n\n`) +
      chalk.green(`> `)
    // "\n<================ To Do ================>\n\nPlease select an option: \n\n1. Add a to-do \n2. Show to-do list \n\n3. Back\n4. Exit \n\n> "
  );

  switch (option) {
    case "1":
      const toDo = await askQuestion(
        `\n` +
          chalk.green(`-`.repeat(44) + `>`) +
          chalk.yellow(`\n\nPlease enter a to-do:`) +
          `\n\n` +
          chalk.green(`> `)
      );
      toDoList.push(toDo);
      await fs.writeFile("todoList.txt", toDoList.join("\n"));
      startToDo(goBackCallback);
      break;

    case "2":
      console.log(`\n` +
      chalk.green(`-`.repeat(44) + `>`) + `\n`);
      toDoList.forEach((item, index) => {
        console.log(chalk.green(`${index + 1}. ${item}`));
      });
      // console.log("\n--------------------------------------------------\n");
      startToDo(goBackCallback);
      break;

    case "3":
    case "b":
    case "B":
      goBackCallback();
      break;

    case "4":
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
          ` \n` +
            chalk.red(`Invalid option:`) +
            ` \n \n` +
            chalk.red(`Please type in one of the following options:`) +
            ` \n \n` +
            chalk.green(`"1"`) +
            chalk.red(` for Add a to-do`) +
            ` \n` +
            chalk.green(`"2"`) +
            chalk.red(` for Show to-do list`) +
            ` \n` +
            chalk.green(`"3", "b", "B"`) +
            chalk.red(` for Go back`) +
            ` \n` +
            chalk.green(`"4", "e", "E"`) +
            chalk.red(` for Exit the app`) +
            ` \n`
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
