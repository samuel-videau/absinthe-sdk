module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json', // Point to the new tsconfig file
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            typescript: {}, 
        },
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'dist/', 'frontend/', 'node_modules/'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'prettier',
    ],
    plugins: [
      '@typescript-eslint',
      'prettier',
      'import'
    ],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'index'],
            ['sibling', 'parent', 'internal'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  };
  