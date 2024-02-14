// ===========================================================================================
//
// project: toolbox/calculator.js
// date: 14.02.2024
// simple calculator that uses the math.js library
// to perform basic operations like addition, subtraction,
// multiplication, and division.
// and px to rem conversion / rem to px conversion
// taking user input from the command line
// using the console.log to display the results
//
// ===========================================================================================

// dependencies================================================================

const readline = require("readline");
const math = require("mathjs");

// insert functions here or import them from common.js==========================

// const { calculate, convertPxToRem, convertRemToPx } = require("./common.js");

// function for converting px to rem===========================================

function pxToRem(px, baseSize = 16) {
  return px / baseSize;
}

function remToPx(rem, baseSize = 16) {
  return rem * baseSize;
}

// ============================================================================

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve =>
        rl.question(query, ans => {
            rl.close();
            resolve(ans);
        })
    );
}

async function start() {
    const expression = await askQuestion("Bitte geben Sie einen mathematischen Ausdruck ein: ");
    try {
        const result = math.evaluate(expression);
        console.log(`Das Ergebnis ist: ${result}`);
    } catch (error) {
        console.log("Ungültiger Ausdruck");
    }

    const px = await askQuestion('Bitte geben Sie die Anzahl der Pixel ein, die Sie in REM konvertieren möchten: ');
    const rem = pxToRem(Number(px));
    console.log(`${px} Pixel sind ${rem} REM.`);
}

start();