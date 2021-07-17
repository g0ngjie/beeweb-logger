const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser', // 使用 ts 解析器
  extends: [
    // 'plugin:@typescript-eslint/recommended', // ts 推荐规则
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
