module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [ 'eslint:recommended', 'airbnb-base' ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 2018,
    'parser': 'babel-eslint',
  },
  plugins: [
  ],
  settings: {
    'import/resolver': {
      'webpack': {
        config: 'webpack.config.js'
      }
    }
  },
  "globals": {
    "lodash": true
  },
  rules: {
    'comma-dangle': ['error', 'never'], //是否允许对象中出现结尾逗号
    'func-names': 0,
    'prefer-arrow-callback': 0
  },
};
