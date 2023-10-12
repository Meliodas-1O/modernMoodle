/* eslint-env node */
module.exports = {
    extends: [
      'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
  ],
    parser: '@typescript-eslint/parser',
    parserOptions: { // add this object
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.eslint.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules : {
      
      // typescript rules
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": "error",
      //"@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/no-unsafe-return": "error",

      // formatting rules
      "block-spacing": "off",
      "@typescript-eslint/block-spacing": "error",
      "brace-style": "off",
      "@typescript-eslint/brace-style": ["error", "1tbs"],
      "@typescript-eslint/comma-spacing": ["error", { "before": false, "after": true }],
      "@typescript-eslint/func-call-spacing": ["error", "always"],
      "@typescript-eslint/key-spacing": ["error", { "beforeColon": false }],
      "keyword-spacing": "off",
      "@typescript-eslint/keyword-spacing": ["error", { "before": true }],
      "@typescript-eslint/lines-around-comment": ["error", { "beforeBlockComment": true }],
      "@typescript-eslint/member-delimiter-style": ["error", {
        "multiline": {
          "delimiter": "comma",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": true
        },
        "overrides": {
          "interface": {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            }
          }
        }
      }]



    }
  };