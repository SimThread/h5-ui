## Empty 空状态

### 引入
``` javascript
import { Empty } from '@hk591/h5-ui';

Vue.use(Empty);
```

### 代码演示

#### 基础用法

```html
<!-- template -->
<template>
    <h5-empty image="/images/empty-network.png" description="網絡異常" />
</template>
```



### Empty API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| image | 图片类型，可选值为 error network search，支持传入图片 URL | `String` | `default` |
| description | 图片下方的描述文字 | `String` | - |
| imageWidth | 图片宽度 | `Number | String` | - |
| imageHeight | 图片高度 | `Number | String` | - |



### Empty 插槽

| 名称 | 说明 | slot-scope |
|------|------|------|
| default | 自定义底部区域 | - |

