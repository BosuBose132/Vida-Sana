const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["**/node_modules/**", "**/.git/**", "**/.DS_Store"],
  },

  js.configs.recommended,

  {
    files: ["frontend/js/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
