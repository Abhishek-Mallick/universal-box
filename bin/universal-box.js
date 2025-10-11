#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { exec, execSync } = require("child_process");

const cloneRepository1 = require("./get/clone-dir.js");
const { generateFromConfig } = require("./generate/generate-from-config.js");
const setupESLint = require("./generate/setup-eslint.js");
const setupPrettier = require("./generate/setup-prettier.js");
const setupFlake8 = require("./generate/setup-flake8.js");
const setupBlack = require("./generate/setup-black.js")
const setupPylint = require("./generate/setup-pylint.js")
const { isGitHubURLValid } = require("./generate/utils.js");

// Scaffold directory is maintained as a mirror version of the templates directory. Maintained by maintainers.
const scaffoldDir = path.resolve(__dirname, "../scaffold");
const templatesRepoBaseURL =
  "https://github.com/Abhishek-Mallick/universal-box/tree/main/template";

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
  case "lint":
    lintProject().catch((error) => {
      console.error(chalk.red("An error occurred during lint setup:"), error.message);
    });
    break;
  case "get":
    const repoUrl = args[0];
    if (!repoUrl) {
      console.error("Please provide a repository URL.");
      process.exit(1);
    }
    if(!isGitHubURLValid(repoUrl)) {
      console.error("Please provide a valid GitHub URL.");
      process.exit(1);
    }
    cloneRepository1(repoUrl, "universal-box");
    break;
  case "generate":
      const configFileName = args[0];
      if (!configFileName) {
        console.error("Please provide a configuration file name (e.g., idea.yml).");
        process.exit(1);
      }
      generateFromConfig(configFileName);
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

      // Error handling for same dir name
      const projectDir = path.resolve(process.cwd(), projectName);
      if (fs.existsSync(projectDir)) {
        console.error(
          chalk.red(
            `❌ A project with the name "${projectName}" already exists. Please choose a different name.`
          )
        );
        return;
      }

      const selectedTemplate = await selectTemplate(scaffoldDir);
      let relativeTemplatePath = path.relative(scaffoldDir, selectedTemplate);
      relativeTemplatePath = relativeTemplatePath.replace(/\\/g, "/");

      const encodedTemplatePath = relativeTemplatePath
        .replace(/ /g, "%20") // Encode spaces
        .replace(/\+/g, "%2B"); // Encode plus sign
      const repoURL = `${templatesRepoBaseURL}/${encodedTemplatePath}`;

      console.log("Codebase available at: ", repoURL);

      try {
        await cloneRepository1(repoURL, projectName);

        console.log(
          chalk.green(
            `✅ Success! Project "${projectName}" has been initialized with the selected template.`
          )
        );
        console.log(chalk.yellow("\nNext steps:"));
        console.log(chalk.yellow(`1. Change to your new project directory:`));
        console.log(chalk.cyan(`   cd ${projectName}`));
        console.log(
          chalk.yellow(
            "2. Refer to the README.md file for installation and running commands."
          )
        );
        console.log(
          chalk.yellow(
            "   This file contains all necessary instructions specific to your project type."
          )
        );
        console.log(
          chalk.yellow(
            "3. Start your development server (check package.json or README.md for specific commands)"
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
            "Need help? Visit our documentation: https://universal-box.vercel.app/"
          )
        );
      } catch (error) {
        console.error(
          chalk.red("An error occurred while cloning the repository."),
          error.message
        );
      }
    });
}

async function lintProject() {
  try {
    const projectDir = process.cwd();

    const { projectType } = await inquirer.prompt([
      { 
        type: "list", 
        name: "projectType", 
        message: "Select the project type:", 
        choices: ["JavaScript", "Python"] 
      },
    ]);

    if (projectType === "JavaScript") {
      const responses = await inquirer.prompt([
        { 
          type: "confirm", 
          name: "useAirbnb", 
          message: "Use Airbnb ESLint config?", 
          default: false 
        },
        { 
          type: "confirm", 
          name: "useReact", 
          message: "Is this a React project?", 
          default: false 
        },
        { 
          type: "confirm", 
          name: "useTypeScript", 
          message: "Do you want to use TypeScript?", 
          default: false 
        },
        { 
          type: "confirm", 
          name: "usePrettier", 
          message: "Include Prettier for formatting?", 
          default: false 
        },
      ]);

      // Setup ESLint with user preferences
      setupESLint(projectDir, {
        useAirbnb: responses.useAirbnb,
        useReact: responses.useReact,
        isTypeScript: responses.useTypeScript,
        usePrettier: responses.usePrettier,
      });

      // If TypeScript is selected, generate tsconfig.json
      if (responses.useTypeScript) {
        setupTypeScriptConfig(projectDir);
      }

      // Setup Prettier if selected
      if (responses.usePrettier) {
        setupPrettier(projectDir);
        setupPrettierIgnore(projectDir); // Create .prettierignore
      }

      // Install necessary dependencies based on selections
      let deps = 'npm install eslint';
      if (responses.useAirbnb) {
        deps += ' eslint-config-airbnb';
      }
      if (responses.useReact) {
        deps += ' eslint-plugin-react';
      }
      if (responses.useTypeScript) {
        deps += ' @typescript-eslint/parser @typescript-eslint/eslint-plugin';
      }
      if (responses.usePrettier) {
        deps += ' prettier eslint-config-prettier eslint-plugin-prettier';
      }
      deps += ' --save-dev --legacy-peer-deps';

      await installDependencies(deps, projectDir);

      // If Prettier is selected, create .prettierignore
      if (responses.usePrettier) {
        console.log(chalk.blue('🔧 Setting up Prettier ignore file...'));
        setupPrettierIgnore(projectDir);
      }

      // If TypeScript is selected, ensure TypeScript is installed
      if (responses.useTypeScript) {
        await installDependencies('npm install typescript --save-dev', projectDir);
        console.log(chalk.blue("🔧 Initializing TypeScript..."));
        await installDependencies('npx tsc --init', projectDir);
      }

    } else if (projectType === "Python") {
      setupFlake8(projectDir);
      await installDependencies("pip install flake8", projectDir);
      const { useBlack } = await inquirer.prompt([
        { type: "confirm", name: "useBlack", message: "Include Black for code formatting?", default: false },
      ]);

      if (useBlack) {
        setupBlack(projectDir);
        await installDependencies("pip install black", projectDir);
      }

      const { usePylint } = await inquirer.prompt([
        { type: "confirm", name: "usePylint", message: "Include Pylint for code analysis?", default: false },
      ]);

      if (usePylint) {
        setupPylint(projectDir);
        await installDependencies("pip install pylint", projectDir);
      }
    }

    console.log(chalk.green(`✅ Linter setup complete! Run your linter using the appropriate commands.`));
  } catch (error) {
    console.error(chalk.red(`❌ Error setting up linter: ${error.message}`));
  }
}

function setupTypeScriptConfig(projectDir) {
  const tsconfig = {
    "compilerOptions": {
      "target": "ES2021",
      "module": "CommonJS",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "./dist",
      "rootDir": "./src",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts"]
  };

  const filePath = path.join(projectDir, 'tsconfig.json');
  fs.writeFileSync(filePath, JSON.stringify(tsconfig, null, 2));

  console.log('✅ TypeScript configuration has been set up.');
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
  ${chalk.cyan("lint")}         ${chalk.dim("Add the default linting configurations")}
  ${chalk.cyan("deploy")}       ${chalk.dim(
    "Trigger build and deployment pipeline"
  )}
  ${chalk.cyan("generate")}     ${chalk.dim("Generate project from a configuration file")}
  ${chalk.cyan("--help")}       ${chalk.dim("Display this help message")}

${chalk.bold("Examples:")}
  ${chalk.green("universal-box --help")}
  ${chalk.green("universal-box init")}
  ${chalk.green("universal-box deploy")}
  ${chalk.green("universal-box lint")}
  ${chalk.green("universal-box generate <idea.yml>")}
  ${chalk.green("universal-box get https://github.com/username/repo")}
  ${chalk.green(
    "universal-box get https://github.com/username/repo/tree/<path_to_sub-directory>"
  )}

${chalk.gray("Need help? Visit our documentation:")} ${chalk.underline.blue(
    "https://universal-box.vercel.app/"
  )}
`);
}

async function selectTemplate(currentDir) {
  const contents = getDirectoryContents(currentDir);

  if (
    contents.includes("README.md") ||
    contents.includes("server") ||
    contents.includes("client") ||
    contents.includes("dump")
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
        dirent.isDirectory() ||
        (dirent.isFile() &&
          (dirent.name === "README.md" || dirent.name === "dump"))
    )
    .map((dirent) => dirent.name);
}


function installDependencies(command, projectDir) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: projectDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`❌ Error installing dependencies:\n${stderr}`));
        return reject(error);
      }
      console.log(chalk.green(`✅ Installed dependencies.\n${stdout}`));
      resolve();
    });
  });
}

function setupPrettierIgnore(projectDir) {
  const prettierIgnoreContent = `
node_modules
dist
build
coverage
*.min.js
*.bundle.js
`;

  const filePath = path.join(projectDir, '.prettierignore');
  fs.writeFileSync(filePath, prettierIgnoreContent);
}