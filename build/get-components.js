const fs = require('fs');
const path = require('path');

const excludes = [
    'index.ts',
    'index.js',
    'index.less',
    'directives',
    'style',
    'mixins',
    'utils',
    'color',
    '.DS_Store'
];

// 获取每个组件所在目录
module.exports = function () {
    const dirs = fs.readdirSync(path.resolve(__dirname, '../src'));
    return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};
