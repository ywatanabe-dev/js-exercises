module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    es2022: true,
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    // 本のサンプルコードが基本的にconstを使っていないためerrorからwarnに緩和する。
    // 通常業務ではほぼ確実に採用されるルールのため、offにはしない。
    "prefer-const": "warn",
  },
};
