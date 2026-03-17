import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'], // Ou 'flat/recommended' pour plus de rigueur
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off', // Pratique pour les petits projets
      'no-unused-vars': 'warn',
    }
  }
];