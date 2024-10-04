const fs = require('fs');
const path = require('path');

function setupFlake8(projectDir) {
  const flake8Config = `
[flake8]
# Specify the maximum allowed line length
max-line-length = 88

# Ignore specific errors
ignore = 
    E501,  # Line too long
    E203,  # Whitespace before ':'
    W503,  # Line break occurred before binary operator
    F401,  # Module imported but unused
    F403,  # 'from module import *' used; unable to detect undefined names

# Define additional configurations for improved linting
exclude =
    .git,
    __pycache__,
    build,
    dist

# Specify which files and directories to include
include = 
    *.py
  `;

  const filePath = path.join(projectDir, '.flake8');
  fs.writeFileSync(filePath, flake8Config.trim());
}

module.exports = setupFlake8;
