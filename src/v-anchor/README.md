## Anchor 锚点

### 引入

``` javascript
import { VAnchor } from '@hk591/h5-ui'

Vue.use(VAnchor);
```

### 基础用法

指令`v-anchor`的值与模块的id对应，例如`v-anchor="1"`,则对应的模块id为`"anchor-1"`; `anchor-distance`表示模块滚动到锚点时，距离到达的距离。
```html
<span v-anchor="1" anchor-distance="40">屋苑资料</span>

<div id="anchor-1">
    <!-- 屋苑资料内容 -->
</div>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|------|
| anchor-distance | 到达时与顶部的距离 | `Number` | 0 |
