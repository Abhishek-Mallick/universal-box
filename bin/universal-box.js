#!/usr/bin/env node
import { exec } from 'child_process';
import chalk from 'chalk';
import { spawn } from 'child_process';

const [,, command] = process.argv;

console.log(`Command received: ${command}`); // Debugging statement


switch (command) {
  case 'init':
    console.log('Initializing...'); // Debugging statement
    const child = spawn('node', ['index.js'], { stdio: 'inherit' });

    child.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    child.on('exit', (code) => {
      console.log(`Process exited with code ${code}`);
    });
    break;

  case '--help':
    console.log(chalk.blue('For more information, visit the documentation at: https://universal-box.co/'));
    console.log(chalk.green('Available commands:'));
    console.log(chalk.green('  - universal-box init'));
    console.log(chalk.green('  - universal-box deploy'));
    break;

  case 'deploy':
    console.log(chalk.yellow('Deployment utility function is still under development in an UAT environment and will be published soon.'));
    break;

  default:
    console.log(chalk.red('Unknown command. Use "universal-box --help" for available commands.'));
}
