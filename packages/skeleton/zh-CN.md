## Skeleton 骨架屏

### 引入
``` javascript
import { Skeleton } from '@hk591/h5-ui';

Vue.use(Skeleton);
```

### 代码演示

#### 基础用法
```html
<h5-skeleton title :row="3" />
```

#### 显示头像
```html
<h5-skeleton title avatar :row="3" />
```

#### 首页
```html
<h5-skeleton home :home-items="7" />
```

#### 列表
```html
<h5-skeleton list reverse row="4" :list-items="3" />
```

#### 详情
```html
<h5-skeleton detail top-row="3" bottom-row="3" />
```

### 基础 - Skeleton Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| row | 段落占位图行数 | `number | string` | `0` |
| row-width | 段落占位图宽度，可传数组来设置每一行的宽度 | `number | string`或此类型数组 | `100%` |
| title | 是否显示标题占位图 | `boolean` | `false` |
| avatar | 是否显示头像占位图 | `boolean` | `false` |
| loading | 是否显示骨架屏，传false时会展示子组件内容 | `boolean` | `true` |
| animate | 是否开启动画 | `boolean` | `true` |
| title-width | 标题占位图宽度 | `number | string` | `40%` |
| avatar-size | 头像占位图大小 | `number | string` | `32px` |
| avatar-shape | 头像占位图形状，可选值为`square` | `string` | `round` |

### 首页 - Skeleton Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| home | 是否显示首页类型 | `boolean` | `false` |
| home-items | 首页入口数量 | `number | string` | `10` |

### 列表 - Skeleton Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| list | 是否显示列表类型 | `boolean` | `false` |
| list-items | 列表项目数量 | `number | string` | `3` |
| reverse | 是否翻转列表项目的图片和内容位置 | `boolean` | `false` |

### 详情 - Skeleton Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| detail | 是否显示详情类型 | `boolean` | `false` |
| top-row | 详情上部分段落占位图行数 | `number | string` | `0` |
| bottom-row | 详情下部分段落占位图行数 | `number | string` | `0` |
