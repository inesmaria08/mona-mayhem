module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended"
  ],
  plugins: ["@typescript-eslint", "astro"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      extends: ["plugin:astro/recommended"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      },
    },
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "semi": ["error", "always"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "comma-dangle": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "max-len": ["warn", { "code": 100 }],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"]
  }
};