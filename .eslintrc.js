module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [ 'eslint:recommended', 'airbnb-base' ],
  parser: ['vue-eslint-parser', 'babel-eslint'],
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: [],
  rules: {
    "comma-dangle": 0, //是否允许对象中出现结尾逗号
  },
};
