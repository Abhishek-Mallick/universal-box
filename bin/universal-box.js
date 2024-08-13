#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const templatesDir = path.resolve(__dirname, '../templates');

const user_selection = process.argv.slice(2);
const command = user_selection[0];

switch (command) {
  case 'init':
    initProject();
    break;
  case '--help':
    showHelp();
    break;
  case 'deploy':
    console.log(chalk.yellow('Deployment utility function is still under development in an UAT environment and will be published soon.'));
    break;
  default:
    console.log(chalk.red('Unknown command. Use "universal-box --help" for available commands.'));
}

function getDirectoryContents(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() || (dirent.isFile() && dirent.name === 'README.md'))
    .map(dirent => dirent.name);
}

async function selectTemplate(currentDir) {
  const contents = getDirectoryContents(currentDir);
  
  if (contents.includes('README.md') || contents.includes('server') || contents.includes('client')) {
    return currentDir;
  }

  const { selection } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'Choose a template or subdirectory:',
      choices: contents,
    },
  ]);

  const newPath = path.join(currentDir, selection);
  if (fs.statSync(newPath).isDirectory()) {
    return selectTemplate(newPath);
  }
  return newPath;
}

async function initProject() {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name:',
    },
  ]);

  const templatePath = await selectTemplate(templatesDir);
  const projectPath = path.resolve(process.cwd(), projectName);

  fs.copySync(templatePath, projectPath);

  console.log(chalk.green(`✅ Success! Project "${projectName}" has been initialized with the selected template.`));
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.yellow(`1. Change to your new project directory:`));
  console.log(chalk.cyan(`   cd ${projectName}`));
  console.log(chalk.yellow('2. Install dependencies (if required):'));
  console.log(chalk.cyan('   npm install') + ' or ' + chalk.cyan('yarn'));
  console.log(chalk.yellow('3. Start your development server (check package.json for specific commands)'));
  console.log(chalk.yellow('\nFor more information, refer to the README.md file in your project directory.'));
  console.log(chalk.blue('\n------ Happy Coding with Universal-Box 🚀 ------'));
  console.log(chalk.gray('Need help? Visit our documentation: https://universal-box.co/docs'));
}

function showHelp() {
  console.log(`
  universal-box - The ultimate project scaffolding tool

  Usage:
    universal-box <command>

  Commands:
    init        Initialize a new project
    --help      Show this help message
    deploy      Triggers build and deployment pipeline

  Examples:
    universal-box --help
    universal-box init
    universal-box deploy
  `);
  console.log(chalk.blue('For more information, visit tahe documentation at: https://universal-box.co/docs'));
}