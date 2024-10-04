const fs = require('fs');
const path = require('path');

function setupPylint(projectDir) {
  const pylintConfig = `
[MASTER]
ignore=CVS

[FORMAT]
max-line-length=88
indent-string='    '  # Use 4 spaces for indentation

[MESSAGES CONTROL]
disable=missing-docstring,invalid-name,too-few-public-methods,too-many-arguments

[DESIGN]
max-args=5  # Max number of arguments for functions and methods
max-locals=15  # Max number of local variables

[LOGGING]
logging-modules=logging
  `;

  const filePath = path.join(projectDir, '.pylintrc');
  fs.writeFileSync(filePath, pylintConfig.trim());
}

module.exports = setupPylint;
