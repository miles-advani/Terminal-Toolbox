// script to open and maximize apps on macOS

const { exec } = require("child_process");

// List of Apps
const apps = ["Warp", "Google Chrome"];

apps.forEach((appName) => {
  exec(`open -a "${appName}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error maximizing ${appName}: ${error}`);
      return;
    }

    // AppleScript to make the app go fullscreen
    const fullscreenCommand = `osascript -e 'tell application "${appName}" to activate' -e 'tell application "System Events" to keystroke "f" using {control down, command down}'`;
    exec(fullscreenCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error maximizing ${appName}: ${error}`);
      }
    });
  });
});
