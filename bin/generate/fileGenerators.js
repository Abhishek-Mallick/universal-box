const fs = require("fs");
const util = require("util");

const fsWritePromisified = util.promisify(fs.writeFile);

const errorHandler = (err) => console.log("\x1b[31m", err);
const successHandler = (fileName) => () =>
  console.log("\x1b[32m", `Generated file ${fileName}`);

module.exports = {
  makeModels: function (models) {
    return models.map((item) =>
      fsWritePromisified(
        `./models/${item}.js`,
        `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${item}Schema = new Schema({}); // Write your schema here

const ${item} = mongoose.model('${item}', ${item}Schema); 

module.exports = ${item};
      `
      )
        .then(successHandler(`${item}.js`))
        .catch(errorHandler)
    );
  },

  makeViews: function (views) {
    return views.map((item) =>
      fsWritePromisified(
        `./views/${item}.html`,
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${item}</title>
</head>
<body>
    
</body>
</html>
      `
      )
        .then(successHandler(`${item}.html`))
        .catch(errorHandler)
    );
  },

  makeControllers: function (controllers) {
    return Object.entries(controllers).map(([fileName, methods]) =>
      fsWritePromisified(
        `./controllers/${fileName}.js`,
        `
module.exports = {
${methods
  .map((method) => `${method}: function() {}, // Add function logic here`)
  .join("\n")}
};
        `
      )
        .then(successHandler(`${fileName}.js`))
        .catch(errorHandler)
    );
  },

  makeRoutes: function (routes) {
    return Object.entries(routes).map(([fileName, methods]) =>
      fsWritePromisified(
        `./routes/${fileName}.js`,
        `
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
        `
      )
        .then(successHandler(`${fileName}.js`))
        .catch(errorHandler)
    );
  },
};
