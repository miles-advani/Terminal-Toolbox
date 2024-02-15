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
    "\n--------------------------------------------------\n\nPlease select an option: \n\n1. Add a to-do \n2. Show to-do list \n\nb. Back\ne. Exit \n\n> "
  );

  switch (option) {
    case "1":
      const toDo = await askQuestion(
        "\n--------------------------------------------------\n\nPlease enter a to-do:\n\n> "
      );
      toDoList.push(toDo);
      await fs.writeFile("todoList.txt", toDoList.join("\n"));
      startToDo(goBackCallback);
      break;

    case "2":
      console.log("\n--------------------------------------------------\n");
      toDoList.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
      });
      // console.log("\n--------------------------------------------------\n");
      startToDo(goBackCallback);
      break;

    case "b":
      goBackCallback();
      break;

    case "e":
      // console.log("\n--------------------------------------------------\n");
      // console.log("\nExiting the app. Goodbye!");
      runMatrix();
      // process.exit(0);
      break;

    default:
      console.log(`\nInvalid option:\n\nPlease type in "1" or "2".\n`);
      startToDo(goBackCallback);
  }
}

// call the function=============================================================

// startToDo();

// exports=======================================================================

module.exports = { startToDo };

// =============================================================================
