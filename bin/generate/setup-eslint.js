const fs = require('fs');
const path = require('path');

function setupESLint(projectDir) {
  const eslintConfig = {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "rules": {}
  };

  const filePath = path.join(projectDir, '.eslintrc.json');
  fs.writeFileSync(filePath, JSON.stringify(eslintConfig, null, 2));
}

module.exports = setupESLint;
