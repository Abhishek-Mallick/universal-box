#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { join } = require('path');
const currentDir = process.cwd();
const chalk = require('chalk');

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
  {
    name: 'project-type',
    type: 'list',
    message: 'Project Type:',
    choices: CHOICES,
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectName = answers['project-name'];
  const projectType = answers['project-type'];
  let boilerplatePath = `${__dirname}/templates/`;
  if (projectType == 'Flask-App') {
    boilerplatePath = `${__dirname}/templates/Flask-App`;
  } else if (projectType == 'FullStack') {
    boilerplatePath = `${__dirname}/templates/FullStack/React(Frontend) + Express(Backend)`;
  }
  fs.mkdirSync(`${currentDir}/${projectName}`);
  fse.copySync(boilerplatePath, projectName);
  createContent(projectName);
});

let createContent = (projectName) => {
  let projectPath = path.join(currentDir, projectName);
  let packageJson = path.join(projectPath, 'package.json');
  let packageObj = fse.readJsonSync(packageJson);
  packageObj.name = projectName;
  fs.writeFileSync(packageJson, JSON.stringify(packageObj));
  welcomeMsg(projectName);
};

let welcomeMsg = (projectName) => {
  console.log(
    chalk.yellow(
      `Yay! we have created all the files to get started for your ${projectName}! 🚀`
    )
  );
  console.log(chalk.yellow(`cd ${projectName}`));
  console.log(chalk.blue(`Happy Coding!! ❤️`));
};