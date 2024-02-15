// ================================================================================
// 
// project: toolbox/06-calender.js
// date: 15.02.2024
// google calender api to display the user's events for the next 7 days
// using the googleapis library
// and the functions from common.js
//
// ================================================================================

// dependencies=================================================================

const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
const readline = require("readline");
const { promisify } = require("util");
const { getUserLocation } = require("../common.js");

// insert the client id, client secret, and redirect uri from the google cloud console

const CLIENT_ID = "your client id";

const CLIENT_SECRET = "your client secret";

const REDIRECT_URI = "your redirect uri";

// create a new OAuth2Client instance

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// function to get the user's events for the next 7 days

async function getEvents() {
    const location = await getUserLocation();
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar.readonly"],
    });
    
    console.log("Authorize this app by visiting this url:", authUrl);
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    const code = await promisify(rl.question)("Enter the code from that page here: ");
    
    rl.close();
    
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const events = await calendar.events.list({
        calendarId: "primary",
        timeMin: today.toISOString(),
        timeMax: nextWeek.toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    });
    
    console.log("\n=============== Events ===============\n");
    
    events.data.items.forEach((event) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
    });
    }

    // call the function

    getEvents();

    // end of 06-calender.js=========================================================

    // export the function===========================================================

    module.exports = { getEvents };
