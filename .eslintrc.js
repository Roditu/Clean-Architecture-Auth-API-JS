module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
  },
  parserOptions: {
    sourceType: 'commonjs',
  },
};
