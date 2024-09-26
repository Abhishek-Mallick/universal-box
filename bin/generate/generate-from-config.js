const fs = require("fs");
const yaml = require("js-yaml");
const utils = require("./utils");
const chalk = require("chalk");

function generateFromConfig(configFileName) {
  const configPath = `${process.cwd()}/${configFileName}`;

  // Check if the config file exists
  if (!fs.existsSync(configPath)) {
    console.error(`Configuration file "${configFileName}" not found.`);
    process.exit(1);
  }

  let config;
  try {
    const fileContents = fs.readFileSync(configPath, "utf8");
    config = yaml.load(fileContents);
  } catch (e) {
    console.error(`Error reading or parsing "${configFileName}": ${e.message}`);
    process.exit(1);
  }

  createProjectStructure(config);

  console.log(
    chalk.blue("\n------ Happy Coding with Universal-Box 🚀 ------\n")
  );
}

function createProjectStructure(config) {
  const { models, controllers, views, routes } = config;
  console.log(chalk.blue("Creating project structure..."));
  if (models) {
    utils
      .makeFolders(["models"])
      .then(() => {
        return Promise.all(
          models.map((model) => {
            return fs.promises.writeFile(
              `models/${model}.js`,
              `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${model}Schema = new Schema({}); // Write your schema here

const ${model} = mongoose.model('${model}', ${model}Schema); 

module.exports = ${model};
          `
            );
          })
        );
      })
      .then(() =>
        console.log(chalk.yellow("\x1b[32m", "✅ Models generated"))
      )
      .catch((err) => console.error(err));
  }

  if (views) {
    utils
      .makeFolders(["views"])
      .then(() => {
        return Promise.all(
          views.map((view) => {
            return fs.promises.writeFile(
              `views/${view}.html`,
              `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${view}</title>
</head>
<body>
    
</body>
</html>
          `
            );
          })
        );
      })
      .then(() =>
        console.log(chalk.yellow("\x1b[32m", "✅ Views generated"))
      )
      .catch((err) => console.error(err));
  }

  if (controllers) {
    utils
      .makeFolders(["controllers"])
      .then(() => {
        return Promise.all(
          Object.entries(controllers).map(([fileName, methods]) => {
            const content = `
module.exports = {
${methods
  .map((method) => `${method}: function() {}, // Add function logic here`)
  .join("\n")}
};
          `;
            return fs.promises.writeFile(`controllers/${fileName}.js`, content);
          })
        );
      })
      .then(() =>
        console.log(
          chalk.yellow("\x1b[32m", "✅ Controllers generated")
        )
      )
      .catch((err) => console.error(err));
  }

  if (routes) {
    utils
      .makeFolders(["routes"])
      .then(() => {
        return Promise.all(
          Object.entries(routes).map(([fileName, methods]) => {
            const content = `
const router = require('express').Router();

${Object.entries(methods)
  .map(([methodType, paths]) =>
    paths
      .map(
        (path) =>
          `router.${methodType}('${path}', (req, res) => {}); // Add your route logic here`
      )
      .join("\n")
  )
  .join("\n")}

module.exports = router;
          `;
            return fs.promises.writeFile(`routes/${fileName}.js`, content);
          })
        );
      })
      .then(() =>
        console.log(chalk.yellow("\x1b[32m", "✅ Routes generated"))
      )
      .catch((err) => console.error(err));
  }
}

module.exports = { generateFromConfig };
