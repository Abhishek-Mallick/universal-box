<div align="center">
  <a href="https://www.npmjs.com/package/universal-box">
    <img src="https://github.com/user-attachments/assets/6a8119d2-e60a-470e-b426-a598df1aa862" width="140px" alt="Universal Box Logo">
  </a>
    <h1>Universal-Box</h1>
  <br>
  <br/>

</div>

<div align="center">
  <a href="https://img.shields.io/github/actions/workflow/status/Abhishek-Mallick/universal-box/.github%2Fworkflows%2Frelease.yml" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/Abhishek-Mallick/universal-box/.github%2Fworkflows%2Frelease.yml?branch=main&style=flat&colorA=000000&colorB=000000" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/universal-box" target="_blank"><img src="https://img.shields.io/npm/v/universal-box?style=flat&colorA=000000&colorB=000000" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/universal-box" target="_blank"><img src="https://img.shields.io/npm/dt/universal-box?style=flat&colorA=000000&colorB=000000" alt="NPM Downloads" /></a>
  <a href="https://discord.gg/aWtZQTQPe4" target="_blank"><img src="https://img.shields.io/discord/1164935524990066740?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff" /></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img alt="License" src="https://img.shields.io/github/license/Abhishek-Mallick/universal-box?color=black" /></a>
<a href="https://snyk.io/advisor/npm-package/universal-box" target="_blank">
  <img src="https://snyk.io/advisor/npm-package/universal-box/badge.svg" alt="Snyk" style="border: none;"/>
</a>
  
<table>
    <tbody>
      <tr>
        <td>
          <a href="https://universal-box.dev/">📚 Read the docs</a>
        </td>
        <td>
          <a href="https://discord.gg/aWtZQTQPe4">💬 Join our Discord</a>
        </td>
        <td>
          <a href="https://universal-box.instatus.com" target="_blank">🔍 Monitor Project Status</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>



**Universal-Box** is a powerful tool designed to streamline your development process with a collection of starter templates and projects. It provides a fast and structured way to kickstart your development journey, allowing you to set up new projects with ease and efficiency.

## Features

- **Starter Templates:** Quickly scaffold new projects using a variety of pre-built templates.
- **Project Initialization:** Simplify project setup with a single command.
- **Flexible Scaffolding:** Easily configure and customize your project structure.
- **Linting Configuration:** Automatically set up linting configurations for JavaScript (ESLint) and Python (Flake8) projects, enhancing code quality.
- **Project Generation:** Generate project files based on user-defined configuration files (e.g., YAML).
- **Repository Cloning:** Clone GitHub repositories or specific subdirectories directly into your project.
- **Deployment Pipeline:** Trigger build and deployment processes (currently under development).

## Installation

To install Universal-Box globally, run:

```bash
npm install -g universal-box
```

Once installed, you can initialize a new project with:
 - Checkout the available commands using `universal-box --help`

## Usage

Here's a brief overview of the available commands:

- **`init`**: Initialize a new project using one of the [starter templates](https://universal-box.dev/templates).

https://github.com/user-attachments/assets/6e0e25e0-0ec4-4293-b555-9729ae7fb8d4

- **`get`**: Clone a GitHub repository or a specific subdirectory from it.
  
https://github.com/user-attachments/assets/31f9ba03-e0b4-4e73-801e-d5e6928abf97

- **`lint`**: Add the default linting configurations for your project. This command sets up ESLint for JavaScript projects and Flake8 for Python projects, along with an optional Prettier configuration for formatting.
  
https://github.com/user-attachments/assets/c47dbcdc-268b-4740-adfe-675233c264fb

- **`generate <file.yml>`**: Generate project files based on a provided configuration file (e.g., YAML).
  
https://github.com/user-attachments/assets/7c3b9fa9-60b1-4aab-b1f6-465b79cac6d3

Here's some [example YAML scripts](https://github.com/Abhishek-Mallick/universal-box/tree/main/website/assets/command/generate) for you to get started.

- **`deploy`**: Trigger the build and deployment pipeline.  
- **`--help`**: Display the help message with command usage.

### Examples

```bash
universal-box --help
universal-box init
universal-box lint
universal-box generate <file.yml>
universal-box deploy
universal-box get https://github.com/username/repo
universal-box get https://github.com/username/repo/tree/<path_to_sub-directory>
```

## Documentation

For more details and advanced usage, visit the [Universal-Box Documentation](https://universal-box.dev/).

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Abhishek Mallick  
[LinkedIn](https://www.linkedin.com/in/abhishek-mallick09/)
