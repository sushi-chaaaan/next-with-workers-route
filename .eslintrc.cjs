// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/** @type {ConfigData} */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:jsx-a11y/recommended",
    "plugin:perfectionist/recommended-natural",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "perfectionist"],
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    // v6 で recommended から削除されたものを有効化
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
    // v6 で strict に移動したルールを有効化
    "@typescript-eslint/no-non-null-assertion": "warn",
    // v6 で recommended に追加されたルールを無効化
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    // stylistic を有効にしたため v5 の recommended にないルールを無効化
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/ban-tslint-comment": "off",
    "@typescript-eslint/class-literal-property-style": "off",
    "@typescript-eslint/consistent-generic-constructors": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-confusing-non-null-assertion": "off",
    "@typescript-eslint/prefer-for-of": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { disallowTypeAnnotations: false },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../", "~/"],
      },
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        type: "natural",
        order: "asc",
        "nullable-last": true,
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "error",
  },
  // ...
  ignorePatterns: [
    ".eslintrc.cjs",
    ".lintstagedrc.mjs",
    "next.config.js",
    "postcss.config.js",
    "prettier.config.mjs",
    "**/node_modules/**",
  ],
};
