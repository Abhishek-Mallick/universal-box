const chalk = require("chalk");

// windows reserved keyword list
const windowsReservedNames = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
]);

function isValidProjectName(projectName, usedInRename = false) {
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;

  if (!projectName || projectName.trim() === "") {
    if (usedInRename) {
      return "Project name cannot be empty.";
    }
    console.log(chalk.red("Project name cannot be empty."));
    return false;
  }

  if (invalidChars.test(projectName)) {
    if (usedInRename) {
      return "Project name contains invalid characters. Please try again using valid characters.";
    }

    console.log(
      chalk.red(
        `Project name contains invalid characters. Please try again using valid characters.`
      )
    );
    return false;
  }

  if (windowsReservedNames.has(projectName.toUpperCase())) {
    if (usedInRename) {
      return `"${projectName}" is a reserved name and cannot be used. Please choose a different name.`;
    }

    console.log(
      chalk.red(
        `"${projectName}" is a reserved name and cannot be used. Please choose a different name.`
      )
    );
    return false;
  }

  if (projectName.startsWith(".") || projectName.endsWith(".")) {
    if (usedInRename) {
      return `Project name cannot start or end with dots.`;
    }
    console.log(chalk.red(`Project name cannot start or end with dots.`));
    return false;
  }

  return true;
}

module.exports = isValidProjectName;
