#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Calculate __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDir = process.cwd();
const templatesDir = path.join(__dirname, 'templates');

console.log(`Templates directory: ${templatesDir}`);

const importantFiles = ['README.md', 'package.json', 'requirements.txt'];
const importantDirs = ['server', 'client'];

const selectFolder = async (folderPath) => {
  try {
    const contents = fs.readdirSync(folderPath, { withFileTypes: true });
    
    // Check for important files or directories
    const containsImportantFile = contents.some((item) =>
      importantFiles.includes(item.name)
    );
    const containsImportantDir = contents.some((item) =>
      importantDirs.includes(item.name)
    );

    if (containsImportantFile || containsImportantDir) {
      return folderPath;
    }

    const choices = contents
      .filter((item) => item.isDirectory() || importantFiles.includes(item.name))
      .map((item) => item.name);

    const answer = await inquirer.prompt([
      {
        name: 'subfolder',
        type: 'list',
        message: 'Select an option:',
        choices: choices,
      },
    ]);

    const selectedPath = path.join(folderPath, answer.subfolder);
    return selectFolder(selectedPath);
  } catch (error) {
    console.error('Error selecting folder:', error);
    throw error;
  }
};

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores, and hashes.';
    },
  },
  {
    name: 'template-type',
    type: 'list',
    message: 'Select Template Type:',
    choices: fs.readdirSync(templatesDir),
  },
];

inquirer.prompt(QUESTIONS).then(async (answers) => {
  try {
    const projectName = answers['project-name'];
    const templateType = answers['template-type'];
    const templatePath = path.join(templatesDir, templateType);

    const finalPath = await selectFolder(templatePath);
    setupProject(finalPath, projectName);
  } catch (error) {
    console.error('Error setting up project:', error);
  }
});

function setupProject(templatePath, projectName) {
  const projectPath = path.join(currentDir, projectName);
  fs.mkdirSync(projectPath);
  fse.copySync(templatePath, projectPath);
  createContent(projectPath, projectName);
}

function createContent(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageObj = fse.readJsonSync(packageJsonPath);
    packageObj.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageObj, null, 2));
  }
  welcomeMsg(projectName);
}

function welcomeMsg(projectName) {
  console.log(chalk.yellow(`Yay! We have created all the files to get started on your ${projectName}! 🚀`));
  console.log(chalk.yellow(`cd ${projectName}`));
  console.log(chalk.blue('Happy Coding!! ❤️'));
}
