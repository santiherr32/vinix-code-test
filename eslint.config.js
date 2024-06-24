const { ESLint } = require('eslint');

module.exports = {
  // Define parser and parser options
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023, // Update to the latest ECMAScript version supported by your environment
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      useJSXTextNode: true,
    },
  },
  // Extend recommended ESLint rules
  extends: [
    'eslint:recommended', // Base ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript ESLint recommended rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Type-checked rules
    'airbnb-typescript', // Airbnb's TypeScript style guide
    'prettier', // Prettier integration
  ],
  // Plugins used
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  // Define environments
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  // Define global variables
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // Define custom rules
  rules: {
    'linebreak-style': 'off',
    'import/no-unresolved': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  // Override rules for specific file types
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
