const fs = require('fs');
const path = require('path');

function setupFlake8(projectDir) {
  const flake8Config = "[flake8]\nignore = E501\nmax-line-length = 88";

  const filePath = path.join(projectDir, '.flake8');
  fs.writeFileSync(filePath, flake8Config);
}

module.exports = setupFlake8;
