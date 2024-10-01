module.exports = {
  modelsContent: function (item) {
    return `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${item}Schema = new Schema({}); // Write your schema here

const ${item} = mongoose.model('${item}', ${item}Schema); 

module.exports = ${item};
       `;
  },

  viewsContent: function (item) {
    return `
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
`;
  },

  controllerContent: function (functions_array) {
    return `module.exports = {\n${functions_array
      .map((item) => `${item}: function() {}, // Add function logic here`)
      .join("\n")}\n};`;
  },

  routesContent: function (config) {
    let base_content = `const router = require('express').Router();\n\n`;

    Object.entries(config).forEach(([type, routes]) => {
      routes.forEach((route) => {
        base_content += `router.${type}('${route}', (req, res) => {}); // Add your route logic here\n`;
      });
    });

    base_content += `\nmodule.exports = router;`;
    return base_content;
  },
};
