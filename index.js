#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const currentDir = process.cwd();
const templatesDir = path.join(__dirname, 'templates');

// Debugging: print the templates directory path
console.log(`Templates directory: ${templatesDir}`);

const selectFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    try {
      const contents = fs.readdirSync(folderPath, { withFileTypes: true });
      const choices = contents
        .filter(item => item.isDirectory() || (item.isFile() && item.name === 'README.md'))
        .map(item => item.name);

      if (choices.includes('README.md')) {
        resolve(folderPath);
      } else {
        inquirer.prompt([
          {
            name: 'subfolder',
            type: 'list',
            message: 'Select an option:',
            choices: choices,
          },
        ]).then((answer) => {
          const selectedPath = path.join(folderPath, answer.subfolder);
          if (fs.existsSync(path.join(selectedPath, 'README.md'))) {
            resolve(selectedPath);
          } else {
            selectFolder(selectedPath).then(resolve).catch(reject);
          }
        }).catch(reject);
      }
    } catch (error) {
      reject(error);
    }
  });
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
    fs.mkdirSync(`${currentDir}/${projectName}`);
    fse.copySync(finalPath, path.join(currentDir, projectName));
    createContent(projectName);
  } catch (error) {
    console.error('Error setting up project:', error);
  }
});

const createContent = (projectName) => {
  const projectPath = path.join(currentDir, projectName);
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageObj = fse.readJsonSync(packageJsonPath);
    packageObj.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageObj, null, 2));
  }
  welcomeMsg(projectName);
};

const welcomeMsg = (projectName) => {
  console.log(
    chalk.yellow(
      `Yay! We have created all the files to get started on your ${projectName}! 🚀`
    )
  );
  console.log(chalk.yellow(`cd ${projectName}`));
  console.log(chalk.blue(`Happy Coding!! ❤️`));
};
