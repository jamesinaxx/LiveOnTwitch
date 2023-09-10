/**
 * @type {import('eslint').ESLint.Options}
 */
const config = {
  env: {
    webextensions: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
    'prettier',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'operator-linebreak': ['off'],
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': ['off'],
    'no-redeclare': ['off'],
    '@typescript-eslint/no-redeclare': ['error'],
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-uses-react': ['off'],
    'react/react-in-jsx-scope': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/require-default-props': ['off'],
    'require-await': ['error'],
    'linebreak-style': ['error'],
    'react/jsx-one-expression-per-line': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'function-paren-newline': ['off'],
    indent: ['off'],
    semi: ['error', 'always'],
    'react/jsx-curly-newline': ['off'],
    'object-curly-newline': ['off'],
    'react/function-component-definition': 'off',
    'react/destructuring-assignment': 'off',
    'no-confusing-arrow': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};

module.exports = config;
