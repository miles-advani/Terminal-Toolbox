// ============================================================================
// 
// project: toolbox/06-notes-app.js
// date: 21.02.2024
// notes app that uses the readline module to take user input
// and display the notes list in the console
// and fs.promises to read and write to a file
//
// ============================================================================

// dependencies================================================================

const readline = require("readline");
const fs = require("fs").promises;

// imports=====================================================================

const notesFilePath = "notes.md";

// function to ask a question and get user input===============================

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

// function to start the notes app===========================================

async function startNotes(goBackCallBack) {
    let notesList;
    try {
        const data = await fs.readFile(notesFilePath, "utf8");
        notesList = data.split("\n");
    } catch (err) {
        notesList = [];
    }

    const option = await askQuestion(
        `Please select an option: \n\n` +
            `1. Add a note \n` +
            `2. Show notes list \n` +
            `3. Exit \n\n` +
            `> `
    );

    switch (option) {
        case "1":
            const note = await askQuestion(`Please enter a note:\n\n> `);
            notesList.push(note);
            await fs.writeFile(notesFilePath, notesList.join("\n"));
            startNotes(notesFilePath);
            break;

        case "2":
            console.log(`Notes:\n`);
            notesList.forEach((item, index) => {
                console.log(`${index + 1}. ${item}`);
            });
            startNotes(notesFilePath);
            break;

        case "3":
            console.log("Exiting the app. Goodbye!");
            process.exit(0);
            break;

        default:
            console.log(`Invalid option: Please type in one of the following options: \n` +
                `"1" for Add a note \n` +
                `"2" for Show notes list \n` +
                `"3" for Exit the app \n`);
            startNotes(notesFilePath);
    }
}

// call the function==========================================================

// startNotes("notes.md");
startNotes();

// exports====================================================================