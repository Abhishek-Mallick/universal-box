const fs = require('fs');
const path = require('path');

function setupBlack(projectDir) {
  const blackConfig = `
[tool.black]
line-length = 88
skip-string-normalization = true
target-version = ['py36', 'py37', 'py38', 'py39', 'py310']
include = '\\.pyi?$'
exclude = '''
/(
    \.git
    |\.mypy_cache
    |\.pytest_cache
    |build
    |dist
)/
'''
  `;

  const filePath = path.join(projectDir, 'pyproject.toml');
  // If pyproject.toml already exists, append the Black configuration
  if (fs.existsSync(filePath)) {
    const currentConfig = fs.readFileSync(filePath, 'utf-8');
    if (!currentConfig.includes('[tool.black]')) {
      fs.appendFileSync(filePath, blackConfig);
    }
  } else {
    fs.writeFileSync(filePath, blackConfig);
  }
}

module.exports = setupBlack;
