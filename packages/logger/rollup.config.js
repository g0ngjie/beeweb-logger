const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const uglify = require('rollup-plugin-uglify').uglify;
const merge = require('lodash.merge');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// 打包任务的个性化配置
const jobs = {
  // build:esm - 编译出符合 esm 规范的可执行文件，供 Vue、React 等采用 esmodule 规范进行模块化打包的项目使用
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module.replace('.min', '')),
    },
  },
  minesm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
    },
    plugins: [uglify()],
  },
  // build:umd - 编译出符合 umd 规范的可执行文件，供 jQuery、Vue、NodeJS 等项目使用
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'logger',
    },
  },
  // build:min - 编译出符合 umd 规范的压缩的可执行文件
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'logger',
    },
    plugins: [uglify()],
  },
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

module.exports = merge(
  {
    input: resolve('./src/index.ts'),
    output: {},
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
  mergeConfig,
);
