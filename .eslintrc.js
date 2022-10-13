module.exports = {
  env: {
    es6: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./test-d/tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
  rules: {
    "tsdoc/syntax": "warn",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "error",
    "space-before-blocks": "off",
    "@typescript-eslint/space-before-blocks": "error",
    "padding-line-between-statements": "off",
    "@typescript-eslint/padding-line-between-statements": "error"
  }
};
