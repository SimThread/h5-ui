const fs = require('fs');
const path = require('path');

const excludes = [
  'index.js',
  'index.less',
  'style',
  'color',
  'mixins',
  'utils',
  '.DS_Store'
];

// 获取每个组件所在目录
module.exports = function () {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'));
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};
