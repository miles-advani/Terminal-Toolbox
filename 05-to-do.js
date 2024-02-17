// =============================================================================
//
// project: toolbox/05-to-do.js
// date: 15.02.2024
// to-do list app that uses the readline module to take user input
// and display the to-do list in the console
//
// =============================================================================

// dependencies=================================================================

const readline = require("readline");
const fs = require("fs").promises;

// import the functions from other files==========================================

const { runMatrix } = require("./common.js");

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
    "\n<================ To Do ================>\n\nPlease select an option: \n\n1. Add a to-do \n2. Show to-do list \n\n3. Back\n4. Exit \n\n> "
  );

  switch (option) {
    case "1":
      const toDo = await askQuestion(
        "\n----------------------------------------\n\nPlease enter a to-do:\n\n> "
      );
      toDoList.push(toDo);
      await fs.writeFile("todoList.txt", toDoList.join("\n"));
      startToDo(goBackCallback);
      break;

    case "2":
      console.log("\n<================ To Do ================>\n");
      toDoList.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
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
        `\nInvalid option:\n\nPlease type in one of the following options:\n\n"1" for Add a to-do\n"2" for Display to-do list\n"3", "b", "B" for Go back\n"4", "e", "E" for Exit the app\n`
      );
      startToDo(goBackCallback);
  }
}

// call the function=============================================================

// startToDo();

// exports=======================================================================

module.exports = { startToDo };

// =============================================================================
