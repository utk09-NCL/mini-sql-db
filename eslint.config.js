// eslint.config.js
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "database/**", "backup/**", ".prettierrc"], // Ignore specific files and directories
  },
  {
    files: ["**/*.js"], // Apply to all JavaScript files
    languageOptions: {
      ecmaVersion: 2022, // Support ES2022 features
      sourceType: "module", // Enable "import" and "export" syntax
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,
      // Disable rules that conflict with Prettier
      ...prettierConfig.rules,
      "no-console": "off", // Allow console statements
      eqeqeq: ["error", "always"], // Enforce strict equality
      "no-var": "error", // Disallow "var"
      "prefer-const": "error", // Prefer "const" over "let" when variables are not reassigned
      "arrow-body-style": ["error", "as-needed"], // Enforce concise arrow function bodies
      curly: ["error", "all"], // Require curly braces for all control structures
      "prettier/prettier": ["error"], // Enforce Prettier formatting
    },
  },
];
