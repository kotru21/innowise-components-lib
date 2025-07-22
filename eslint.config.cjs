// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const storybook = require("eslint-plugin-storybook");
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      'no-unused-vars': 'off', // TypeScript handles this
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'off', // TypeScript handles this
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  // Storybook configuration
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    plugins: {
      storybook: storybook,
    },
    rules: {
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'error',
      'storybook/no-redundant-story-name': 'error',
      'storybook/prefer-pascal-case': 'error',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
    },
  },
];
