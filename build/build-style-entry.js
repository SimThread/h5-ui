/* eslint-disable no-use-before-define */
/**
 * 为所有组件构建样式入口
 */

const fs = require('fs-extra');
const path = require('path');
const dependencyTree = require('dependency-tree');
const components = require('./get-components')();

// 设置不用进行依赖查找的组件，名称为packages下的目录名
const whiteList = [
  'info',
  'icon',
  'loading',
  // 'cell',
  // 'cell-group',
  // 'button',
  'overlay',
];
const dir = path.join(__dirname, '../es');

function destEntryFile(component, filename, ext = '') {
  const deps = analyzeDependencies(component).map(dep => (
    getStyleRelativePath(component, dep, ext)
  ));

  const esEntry = path.join(dir, component, `style/${filename}`);
  const libEntry = path.join(
    __dirname,
    '../lib',
    component,
    `style/${filename}`
  );
  const esContent = deps.map(dep => `import '${dep}';`).join('\n');
  const libContent = deps.map(dep => `require('${dep}');`).join('\n');

  fs.outputFileSync(esEntry, esContent);
  fs.outputFileSync(libEntry, libContent);
}

// 分析组件依赖
function analyzeDependencies(component) {
  const checkList = ['base'];

  search(
    dependencyTree({
      directory: dir,
      filename: path.join(dir, component, 'index.js'),
      filter: path => !~path.indexOf('node_modules')
    }),
    component,
    checkList
  );

  if (!whiteList.includes(component)) {
    checkList.push(component);
  }

  return checkList.filter(item => checkComponentHasStyle(item));
}

// 递归搜寻
function search(tree, component, checkList) {
  Object.keys(tree).forEach(key => {
    search(tree[key], component, checkList);

    components
      .filter(item => (
        key
          .replace(dir, '')
          .split(path.sep)
          .includes(item)
      ))
      .forEach(item => {
        if (
          !checkList.includes(item) &&
          !whiteList.includes(item) &&
          item !== component
        ) {
          checkList.push(item);
        }
      });
  });
}

// 返回指定格式的样式文件路径
function getStylePath(component, ext = '.css') {
  if (component === 'base') {
    return path.join(__dirname, `../es/_style/base${ext}`);
  }
  return path.join(__dirname, `../es/${component}/index${ext}`);
}

function getStyleRelativePath(component, style, ext) {
  return path.relative(
    path.join(__dirname, `../es/${component}/_style`),
    getStylePath(style, ext)
  ).split(path.sep).join('/');
}

// 检查组件是否含有样式文件
function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component));
}

// 循环为每个组件创建index.js(less.js)，并将其.css(.less)依赖导入index.js文件
components.forEach(component => {
  // css entry
  destEntryFile(component, 'index.js', '.css');
  // less entry
  destEntryFile(component, 'less.js', '.less');
});
