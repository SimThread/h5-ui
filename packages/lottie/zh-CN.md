## Lottie SVG动画

该组件是针对[lottie-web](https://github.com/airbnb/lottie-web)的Vue组件封装,了解更多请查看相关文档

### 引入
``` javascript
import { Lottie } from '@hk591/h5-ui';

Vue.use(Lottie);
```

### 代码演示

#### 基础用法

```html
<!-- template -->
<template>
  <h5-lottie 
    :width="50" 
    :height="50" 
    :options="{
        path: '/lottie-vr/data.json' }"/>
</template>
```

其中`options.path`为json类型的可访问的静态资源路径。注意，如果json文件中有引用到图片，需要同时引入图片资源

### Lottie API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| width | 图标宽度，默认单位为px | `Number` 或 `String` | - |
| height | 图标宽度，默认单位为px | `Number` 或 `String` | - |
| options | 配置项 | `Object` | - |

关于options的详细配置，请查看[lottie-web](https://github.com/airbnb/lottie-web)

### Lottie Event

| 参数 | 说明 | 回调参数 |
|------|------|------|
| animCreated | 动画创建后的回调函数 | - |
