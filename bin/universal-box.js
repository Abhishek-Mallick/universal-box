#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import chalk from 'chalk';

// Get the directory of the current script (bin/universal-box.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command
const [,, command] = process.argv;
console.log(`Command received: ${command}`); // Debugging statement

function getPackageJsonPath() {
  // Resolve the path to the node_modules directory
  const nodeModulesPath = path.join(__dirname, '../node_modules/universal-box');
  const packageJsonPath = path.join(nodeModulesPath, 'package.json');
  
  return packageJsonPath;
}

function getStartScript() {
  const packageJsonPath = getPackageJsonPath();
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.scripts && packageJson.scripts.start;
  }
  return null;
}

function runStartScript() {
  const startScript = getStartScript();
  
  if (startScript) {
    console.log(`Executing start script: ${startScript}`); // Debugging statement
    const child = spawn('npm', ['run', startScript], { stdio: 'inherit' });
    
    child.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    child.on('exit', (code) => {
      console.log(`Process exited with code ${code}`);
    });
  } else {
    console.log(chalk.red('No start script found in package.json'));
  }
}

function runInitCommand() {
  // Resolve the path to index.js relative to the package root
  const indexPath = path.join(__dirname, '../index.js');
  console.log(`Executing: node ${indexPath}`); // Debugging statement
  
  // Execute index.js
  const child = spawn('node', [indexPath], { stdio: 'inherit' });

  child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  child.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
  });
}

switch (command) {
  case 'init':
    console.log('Initializing...'); // Debugging statement
    runInitCommand();
    break;

  case 'start':
    console.log('Starting application...'); // Debugging statement
    runStartScript();
    break;

  case '--help':
    console.log(chalk.blue('For more information, visit the documentation at: https://universal-box.co/'));
    console.log(chalk.green('Available commands:'));
    console.log(chalk.green('  - universal-box init'));
    console.log(chalk.green('  - universal-box start'));
    console.log(chalk.green('  - universal-box deploy'));
    break;

  case 'deploy':
    console.log(chalk.yellow('Deployment utility function is still under development in an UAT environment and will be published soon.'));
    break;

  default:
    console.log(chalk.red('Unknown command. Use "universal-box --help" for available commands.'));
}
