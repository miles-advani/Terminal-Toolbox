// =============================================================================
// 
// project: toolbox/01-start.js
// date: 14.02.2024
// combining all tools in one file
//
// =============================================================================

// dependencies=================================================================

const readline = require("readline");
// const math = require("mathjs");
// const axios = require("axios");
// const moment = require("moment");

// insert functions here or import them=========================================

const { getWeatherForecast } = require('./03-weather.js');
const { startCalculator } = require('./04-calculator.js');

// Ihre vorhandene Logik hier



// function to ask the user for the next action==================================
function askNextAction() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Would you like to retrieve the weather forecast or start the calculator? (weather/calculator): ', (answer) => {
        rl.close();
        if (answer === 'weather') {
            getWeatherForecast();
        } else if (answer === 'calculator') {
            startCalculator();
        } else {
            console.log('Invalid input. Please enter "weather" or "calculator".');
            askNextAction();
        }
    });
}

// Rufen Sie die Funktion nach Ihrer vorhandenen Logik auf
askNextAction();
