import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      quotes: ['error', 'single'],
    },
  },
  {
    ...jest.configs['flat/recommended'],
  },
  {
    ignores: [
      '**/*', // Ignore everything
      '!src/**', // Except the src folder
    ],
  },
];
