const fs = require('fs');
const path = require('path');

function setupESLint(projectDir, options) {
  const eslintConfig = {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      "eslint:recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "rules": {}
  };

  // Add Airbnb config if selected
  if (options.useAirbnb) {
    eslintConfig.extends.push("airbnb");
  }

  // Add React plugin if selected
  if (options.useReact) {
    eslintConfig.extends.push("plugin:react/recommended");
    eslintConfig.settings = {
      react: {
        version: "detect"
      }
    };
  }

  // Add TypeScript support if selected
  if (options.isTypeScript) {
    eslintConfig.parser = "@typescript-eslint/parser";
    eslintConfig.plugins = ["@typescript-eslint"];
    eslintConfig.extends.push("plugin:@typescript-eslint/recommended");
  }

  const filePath = path.join(projectDir, '.eslintrc.json');
  fs.writeFileSync(filePath, JSON.stringify(eslintConfig, null, 2));

  // Optionally, update package.json scripts
  updatePackageJsonScripts(projectDir, options);
}

function updatePackageJsonScripts(projectDir, options) {
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    packageJson.scripts = packageJson.scripts || {};

    // Add lint scripts
    packageJson.scripts.lint = "eslint .";
    packageJson.scripts["lint:fix"] = "eslint . --fix";

    if (options.isTypeScript) {
      packageJson.scripts["lint:ts"] = "eslint . --ext .ts,.tsx";
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } else {
    console.warn("⚠️ package.json not found. Skipping script additions.");
  }
}

module.exports = setupESLint;
