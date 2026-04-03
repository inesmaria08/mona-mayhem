module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', 'public/**'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'ignoreRestSiblings': true }],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'max-len': ['warn', { 'code': 100 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: require('astro-eslint-parser'),
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    plugins: {
      astro: require('eslint-plugin-astro'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'ignoreRestSiblings': true }],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'max-len': ['warn', { 'code': 100 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
];
