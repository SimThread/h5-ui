## SvgIcon SVG图标

该组件需要配合[svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)使用，详情请查看[svg-sprite-loader 使用教程](https://www.jianshu.com/p/70f9c9268c83)

### 引入
``` javascript
import { SvgIcon } from '@hk591/h5-ui';

Vue.use(SvgIcon);
```

### 代码演示

#### 基础用法

```html
<!-- template -->
<template>
  <h5-svg-icon name="share" color="#000000" />
</template>
```

### SvgIcon API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| name | 图标名称，必选 | `String` | - |
| width | 图标宽度 | `Number` 或 `String` | 1em |
| height | 图标高度 | `Number` 或 `String` | 1em |
| color | 图标颜色，必选 | `String` | - |
