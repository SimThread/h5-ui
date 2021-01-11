# UI组件库发布流程

## 一、组件结构

![1559631929479](
https://bear-markdown-img.oss-cn-shenzhen.aliyuncs.com/1559631929479.png)

从图中我们可以看到分别有以下几个文件

| 名称       | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| demo       | 目录，通常里面是一个index.vue文件（也可以放资源文件等），会展示在文档中的demo中 |
| index.js   | 组件的主体逻辑代码                                           |
| index.less | 组件的样式                                                   |
| README.md   | 组件的文档                                             |



## 二、创建组件

1.在packages目录中创建一个组件，组件结构参考上面的`组件结构说明`
![1559631004914](https://bear-markdown-img.oss-cn-shenzhen.aliyuncs.com/1559631004914.png)

2.配置文档路由路径和标题

在`docs/src/doc.config.js`文件中配置文档的路由路径和标题

![1559631193337](
https://bear-markdown-img.oss-cn-shenzhen.aliyuncs.com/1559631193337.png)

3.引入新组件样式
在`packages/index.less`中引入新组件的样式

4.重新生成路由配置文件

执行以下命令来重新生成路由配置文件

```bash
npm run build:entry
```

![1559631354236](
https://bear-markdown-img.oss-cn-shenzhen.aliyuncs.com/1559631354236.png)

5.启动服务

```bash
npm run dev
```
服务可以一开始就启动，新增组件不需要重启服务


## 三、发布组件
1.登录npm账号。使用npm login登录，任意账号都可以发布项目

2.提交代码。需要在develop分支上提交

3.合并master分支。拉取master分支最新代码，把master分支代码合并到develop

4.发布版本。在develop分支上执行npm run release后，在控制台输入要发布的版号；之后会自动进行打包并发布到公司的[npm仓库](http://npmjs.addcn.com/)

## 四、更新最新发布的组件库

在工程目录中执行以下命令

```bash
npm install @hk591/h5-ui@latest --save
```
