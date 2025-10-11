import js from "@eslint/js";
import globals from "globals";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: pluginImport,
    },
    extends: [
      js.configs.recommended, // base JS rules
      prettier, // disables formatting conflicts
    ],
    rules: {
      "no-var": "error",
      "consistent-return": "error",
      "eqeqeq": ["error", "always"],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
        },
      ],
    },
  },
]);
