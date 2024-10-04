const fs = require('fs');
const path = require('path');

/**
 * Sets up Prettier configuration with default rules.
 * @param {string} projectDir - The root directory of the project.
 */
function setupPrettier(projectDir) {
  const prettierConfig = {
    singleQuote: true,        // Use single quotes instead of double quotes
    semi: false,              // Do not add semicolons at the end of statements
    printWidth: 80,           // Specify the line length that the printer will wrap on
    tabWidth: 2,              // Number of spaces per indentation level
    trailingComma: 'es5',     // Print trailing commas wherever possible in ES5
    bracketSpacing: true,     // Print spaces between brackets in object literals
    arrowParens: 'avoid',     // Omit parentheses when possible
    endOfLine: 'lf',          // Ensure consistent line endings
    proseWrap: 'preserve',    // Do not wrap prose
    jsxSingleQuote: false,    // Use double quotes in JSX
    htmlWhitespaceSensitivity: 'css', // Respect the default value of CSS
    embeddedLanguageFormatting: 'auto', // Enable embedded language formatting
    // Add more default Prettier rules as needed
  };

  const filePath = path.join(projectDir, '.prettierrc');
  fs.writeFileSync(filePath, JSON.stringify(prettierConfig, null, 2));

  console.log('✅ Prettier configuration has been set up with default rules.');
}

module.exports = setupPrettier;
