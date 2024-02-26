// let chalk;
// import("chalk").then((module) => {
//   chalk = module.default;
// });

// const { re } = require("mathjs");

async function changeColor() {
  const chalk = (await import("chalk")).default;

  colorTest = chalk.blue;
  return colorTest;
}

module.exports = {
  changeColor,
};
