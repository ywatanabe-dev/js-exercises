import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import googleConfig from 'eslint-config-google';

const newGoogleConfig = {
  rules: {
    ...googleConfig.rules,
  },
};

// 組み込みのjsdocのlint設定は削除されたため、プリセットから取り除く
delete newGoogleConfig.rules['valid-jsdoc'];
delete newGoogleConfig.rules['require-jsdoc'];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
  {ignores: ['ex01/format_sample.js']},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  newGoogleConfig,
  eslintConfigPrettier,
];
