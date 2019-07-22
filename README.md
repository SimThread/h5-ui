<h3 align="center" style="margin: 30px 0 35px;">轻量、可靠的移动端 Vue 组件库</h3>



## 特性

* 支持 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
* 支持 TypeScript
* 支持 SSR 

## 安装
```shell
yarn install
```

#### NPM

```shell
npm i h5-ui -S
```

#### YARN

```shell
yarn add h5-ui
```

## 快速上手

#### 方式一. 使用  [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (推荐)

`babel-plugin-import` 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```bash
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -D
```

```js
// 在 .babelrc 或 babel-loader 中添加插件配置
// 注意：webpack 1 无需设置 libraryDirectory。
{
  "plugins": [
    ["import", {
      "libraryName": "h5-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

接着你可以在代码中直接引入 h5-ui 组件，插件会自动将代码转化为方式二中的按需引入形式。

```js
import { Button } from 'h5-ui';
```

> 如果你在使用 TypeScript，可以使用 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 实现按需引入

#### 方式二. 按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```js
import Button from 'h5-ui/lib/button';
import 'h5-ui/lib/button/style';
```

#### 方式三. 导入所有组件

```js
import Vue from 'vue';
import H5UI from 'h5-ui';
import 'h5-ui/lib/index.css';

Vue.use(H5UI);
```

> 注意：配置 babel-plugin-import 插件后将不允许导入所有组件

更多内容请参考 快速上手

## 浏览器支持

现代浏览器以及 Android 4.0+, iOS 6+.