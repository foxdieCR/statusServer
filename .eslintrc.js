module.exports = {
  extends: ['airbnb-base', 'eslint-config-prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
      modules: true
    }
  },
  env: {
    es6: false,
    node: true,
  },
  rules: {
    'no-extra-semi': 0,
    semi: 0,
    strict: [0, 'global'],
    'no-useless-escape': 0,
    'linebreak-style': 0,
    'prettier/prettier': ['warn', { semi: false, singleQuote: true, trailingComma: 'es5' }]
  },
};