module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': ['error', 'always'],
    'no-else-return': ['error'],
  },
  overrides: [
    {
      files: ['src/modules/logger/**/*.ts'],
      rules: {
        '@typescript-eslint/camelcase': 'off',
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
