module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    'prettier/prettier':[
      'warn',
      {
        singleQuote:true,//单引号
        semi:false,//无分号
        printWidth:80,//80
        tarilingComma:'none',//不加对象最后逗号
        endOfLine:'auto'//换行符号不限制
      }
    ],
    'vue/multi-word-component-names':[
      'warn',
      {
        ignores:['index']
      }
    ],
    'vue/no-setup-props-destructure':['off'],
    'no-undef':'error',
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
