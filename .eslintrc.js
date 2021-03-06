module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  extends: ['prettier'],
};
