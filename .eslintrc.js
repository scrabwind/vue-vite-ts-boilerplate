module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json'
  },
  parser: 'vue-eslint-parser',
  rules: {
    'import/prefer-default-export': 'off'
  },
  plugins: ['vue'],
  ignorePatterns: ['node_modules', 'assets', 'vite.config.ts']
}
