/**
 * 编译组件
 */
const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const srcDir = path.join(__dirname, '../src');
const esDir = path.join(__dirname, '../es');
const libDir = path.join(__dirname, '../lib');
const babelConfig = {
    configFile: path.join(__dirname, '../babel.config.js')
};

const scriptRegExp = /\.(js|ts|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isCode = path => !/(demo|test|\.md)$/.test(path);
const isScript = path => scriptRegExp.test(path);

function compile(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);

        // 移除不必要的文件
        if (!isCode(file)) {
            return fs.removeSync(filePath);
        }

        // 递归搜寻
        if (isDir(filePath)) {
            return compile(filePath);
        }

        // 编译js或ts
        if (isScript(file)) {
            const { code } = babel.transformFileSync(filePath, babelConfig);
            fs.removeSync(filePath);
            fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code);
        }
    });
}

// 清空目录
fs.emptyDirSync(esDir);
fs.emptyDirSync(libDir);

// 编译 es dir
fs.copySync(srcDir, esDir);
compile(esDir);

process.env.BABEL_MODULE = 'commonjs';

// 编译 lib dir
fs.copySync(srcDir, libDir);
compile(libDir);
