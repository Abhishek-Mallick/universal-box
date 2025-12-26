const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const isValidProjectName = require("./is_valid_name.utils");

async function validateProjectName(receivedProjectName) {
  let projectName = receivedProjectName;
  const isValidName = isValidProjectName(projectName, false);

  if (!isValidName) {
    process.exit(1);
  }

  projectName = projectName.trim();

  const projectDirectory = path.resolve(process.cwd(), projectName);
  let pathExists = false;
  let isDirectory = false;

  try {
    pathExists = fs.existsSync(projectDirectory);
    if (pathExists) {
      isDirectory = fs.lstatSync(projectDirectory).isDirectory();
    }
  } catch (error) {
    console.log(chalk.red(`Error accessing path: ${error.message}`));
    process.exit(1);
  }

  if (pathExists) {
    if (!isDirectory) {
      console.log(
        chalk.red(
          `A file named "${projectName}" exists and is not a directory. Please remove or rename the file and try again.`
        )
      );
      process.exit(1);
    }

    /**
     * if the directory exists, we give the user three options:
     * 1. overwrite the existing directory.
     * 2. choose a different project name.
     * 3. cancel the operation.
     */
    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: `Directory "${projectName}" already exists. What would you like to do?`,
          choices: [
            { name: "Overwrite the existing directory", value: "overwrite" },
            { name: "Choose a different project name", value: "rename" },
            { name: "Cancel the operation", value: "cancel" },
          ],
        },
      ]);

      switch (action) {
        /**
         * if the user chooses to overwrite, we ask for confirmation.
         * if confirmed, we attempt to delete the directory.
         * if deletion is successful, we return the original project name.
         * if deletion fails (e.g., due to permissions), we notify the user and exit.
         * if not confirmed, we return to the action selection menu.
         */
        case "overwrite":
          const { confirmOverwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "confirmOverwrite",
              message: `Are you sure you want to permanently delete "${projectName}"?`,
              default: false,
            },
          ]);

          if (!confirmOverwrite) {
            console.log(
              chalk.yellow("Overwrite cancelled. Returning to previous menu...")
            );
            continue;
          }

          try {
            fs.rmSync(projectDirectory, { recursive: true, force: true });
            console.log(
              chalk.yellow(`Directory "${projectName}" has been removed.`)
            );
            return projectName;
          } catch (error) {
            if (error.code === "EACCES" || error.code === "EPERM") {
              console.log(
                chalk.red(
                  `Permission denied. Unable to remove "${projectName}". Try running with elevated privileges.`
                )
              );
            } else {
              console.log(
                chalk.red(
                  `Failed to remove the directory "${projectName}": ${error.message}`
                )
              );
            }
            process.exit(1);
          }

        case "rename":
          /**
           * here, the user can enter a new project name (or) type 'cancel' to go back to the previous menu.
           * we validate the new project name to ensure it meets the criteria.
           * if the new name is valid and does not exist, we return it.
           * if it exists, we notify the user and prompt again.
           * if the user types 'cancel', we break out of this loop and return to the previous menu.
           */
          while (true) {
            const { newProjectName } = await inquirer.prompt([
              {
                type: "input",
                name: "newProjectName",
                message:
                  "Enter a different project name (or type 'cancel' to go back):",
                validate: (input) => {
                  return isValidProjectName(input, true);
                },
              },
            ]);

            const trimmedName = newProjectName.trim();
            if (trimmedName.toLowerCase() === "cancel") {
              console.log(chalk.yellow("Returning to previous menu..."));
              break;
            }

            const newProjectPath = path.resolve(process.cwd(), trimmedName);

            if (fs.existsSync(newProjectPath)) {
              console.log(
                chalk.red(
                  `A directory or file named "${trimmedName}" already exists. Please try again with a different name.`
                )
              );
              continue;
            }

            return trimmedName;
          }
          break;

        case "cancel":
          console.log(chalk.yellowBright("Project initialization cancelled."));
          process.exit(0);
      }
    }
  }

  return projectName;
}

module.exports = validateProjectName;