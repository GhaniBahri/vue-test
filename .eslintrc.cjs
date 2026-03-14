module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', 
    'prettier', 
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error', 
    'vue/multi-word-component-names': 'off', 
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};