#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const cloneRepository = require("./clone-dir.js");

const templatesDir = path.resolve(__dirname, "../templates");

const user_selection = process.argv.slice(2);
const [, , command, ...args] = process.argv;

switch (command) {
  case "init":
    initProject();
    break;
  case "--help":
    showHelp();
    break;
  case "deploy":
    console.log(
      chalk.yellow(
        "Deployment utility function is still under development in a UAT environment and will be published soon."
      )
    );
    break;
  case "get":
    const repoUrl = args[0];
    if (!repoUrl) {
      console.error("Please provide a repository URL.");
      process.exit(1);
    }
    cloneRepository(repoUrl);
    break;

  default:
    console.log(
      chalk.red(
        'Unknown command. Use "universal-box --help" for available commands.'
      )
    );
}

function initProject() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "Enter the project name:",
      },
    ])
    .then(async (answers) => {
      const projectName = answers.projectName;
      const templatePath = await selectTemplate(templatesDir);
      const projectPath = path.resolve(process.cwd(), projectName);

      fs.copySync(templatePath, projectPath);

      console.log(
        chalk.green(
          `✅ Success! Project "${projectName}" has been initialized with the selected template.`
        )
      );
      console.log(chalk.yellow("\nNext steps:"));
      console.log(chalk.yellow(`1. Change to your new project directory:`));
      console.log(chalk.cyan(`   cd ${projectName}`));
      console.log(chalk.yellow("2. Install dependencies (if required):"));
      console.log(chalk.cyan("   npm install") + " or " + chalk.cyan("yarn"));
      console.log(
        chalk.yellow(
          "3. Start your development server (check package.json for specific commands)"
        )
      );
      console.log(
        chalk.yellow(
          "\nFor more information, refer to the README.md file in your project directory."
        )
      );
      console.log(
        chalk.blue("\n------ Happy Coding with Universal-Box 🚀 ------")
      );
      console.log(
        chalk.gray(
          "Need help? Visit our documentation: https://universal-box.co/"
        )
      );
    });
}

function showHelp() {
  console.log(`
${chalk.blue.bold("Universal Box - The Ultimate Project Scaffolding Tool")}

${chalk.bold("Usage:")}
  ${chalk.green("universal-box")} <command>

${chalk.bold("Commands:")}
  ${chalk.cyan("init")}         ${chalk.dim("Initialize a new project")}
  ${chalk.cyan("get")}          ${chalk.dim(
    "Clone a GitHub repository or a specific subdirectory from it"
  )}
  ${chalk.cyan("deploy")}       ${chalk.dim(
    "Trigger build and deployment pipeline"
  )}
  ${chalk.cyan("--help")}       ${chalk.dim("Display this help message")}

${chalk.bold("Examples:")}
  ${chalk.green("universal-box --help")}
  ${chalk.green("universal-box init")}
  ${chalk.green("universal-box deploy")}
  ${chalk.green("universal-box get https://github.com/username/repo")}
  ${chalk.green(
    "universal-box get https://github.com/username/repo/tree/<path_to_sub-directory>"
  )}

${chalk.gray("Need help? Visit our documentation:")} ${chalk.underline.blue(
    "https://universal-box.co/"
  )}
`);
}

async function selectTemplate(currentDir) {
  const contents = getDirectoryContents(currentDir);

  if (
    contents.includes("README.md") ||
    contents.includes("server") ||
    contents.includes("client")
  ) {
    return currentDir;
  }

  const { selection } = await inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "Choose a template or subdirectory:",
      choices: contents,
    },
  ]);

  const newPath = path.join(currentDir, selection);
  if (fs.statSync(newPath).isDirectory()) {
    return selectTemplate(newPath);
  }
  return newPath;
}

function getDirectoryContents(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() || (dirent.isFile() && dirent.name === "README.md")
    )
    .map((dirent) => dirent.name);
}
