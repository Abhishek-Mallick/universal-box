const fs = require('fs');
const path = require('path');

function setupPrettier(projectDir) {
  const prettierConfig = {
    "singleQuote": true,
    "semi": false
  };

  const filePath = path.join(projectDir, '.prettierrc');
  fs.writeFileSync(filePath, JSON.stringify(prettierConfig, null, 2));
}

module.exports = setupPrettier;
