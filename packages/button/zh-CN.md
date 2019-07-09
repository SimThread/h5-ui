## Button 按钮

### 使用指南
``` javascript
import { Button } from 'h5-ui';

Vue.use(Button);
```

### 代码演示

#### 按钮类型

支持`default`、`primary`、`warning`、`danger`四种类型，默认为`default`

```html
<h5-button type="default">默认按钮</h5-button>
<h5-button type="primary">主要按钮</h5-button>
<h5-button type="warning">警告按钮</h5-button>
<h5-button type="danger">危险按钮</h5-button>
```

#### 朴素按钮

```html
<h5-button plain type="primary">朴素按钮</h5-button>
<h5-button plain type="danger">朴素按钮</h5-button>
```

#### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮不可点击

```html
<h5-button disabled type="primary">禁用状态</h5-button>
<h5-button disabled type="danger">禁用状态</h5-button>
```

#### 加载状态

```html 
<h5-button loading type="primary" />
<h5-button loading type="danger" loading-text="加载中..." />
```

#### 按钮形状

```html 
<h5-button square type="primary">方形按钮</h5-button>
<h5-button round type="danger">圆形按钮</h5-button>
```

#### 按钮尺寸

支持`large`、`normal`、`small`、`mini`四种尺寸，默认为`normal`

```html 
<h5-button size="large">大号按钮</h5-button>
<h5-button size="normal">普通按钮</h5-button>
<h5-button size="small">小型按钮</h5-button>
<h5-button size="mini">迷你按钮</h5-button>
```


### API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| type | 类型，可选值为 `primary` `warning` `danger` | `String` | `default` | - |
| size | 尺寸，可选值为 `large` `small` `mini` | `String` | `normal` | - |
| text | 文字 | `String` | - | - |
| tag | HTML 标签 | `String` | `button` | - |
| native-type | 原生 type 属性 | `String` | - | - |
| block | 是否为块级元素 | `Boolean` | `false` | - |
| plain | 是否为朴素按钮 | `Boolean` | `false` | 1.1.13 |
| square | 是否为方形按钮 | `Boolean` | `false` | 1.2.0 |
| round | 是否为圆形按钮 | `Boolean` | `false` | 1.3.4 |
| disabled | 是否禁用按钮 | `Boolean` | `false` | - |
| loading | 是否显示为加载状态 | `Boolean` | `false` | - |
| loading-text | 加载状态提示文字 | `String` | - | 1.6.3 |

### Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击按钮且按钮状态不为加载或禁用时触发 | - |
