## DOM 文档操作

### 使用指南

``` javascript
import { TDom } from 'h5-ui';
```

### 代码演示

#### 添加类名

```javascript
TDom.addClass(el, className)
```

#### 移除类名

```javascript
TDom.removeClass(el, className)
```

#### 是否含有类名

```javascript
TDom.hasClass(el, className)
```

#### 切换类名

```javascript
TDom.toggleClass(el, className)
```

#### 插入到目标元素之后

```javascript
TDom.insertAfter(newEl, targetEl)
```

#### 移除元素

```javascript
TDom.remove(el)
```

#### 获取元素高度（包含外边框）

```javascript
TDom.outerHeight(el)
```

#### 获取元素高度（包含margin）

```javascript
TDom.outerHeightWithMargin(el)
```

#### 获取元素宽度（包含外边框）

```javascript
TDom.outerWidth(el)
```

#### 获取元素宽度（包含margin）

```javascript
TDom.outerWidthWithMargin(el)
```

#### 获取渲染后的样式

```javascript
TDom.getComputedStyles(el)
```

#### 获取元素距离文档边界的距离（如果文档设置了边框，以内边框为参照）

```javascript
TDom.getOffset(el)
```

#### 返回当前元素相对于关系为offsetParent的节点的位置

```javascript
TDom.getPosition(el)
```

#### 设置样式

```javascript
TDom.setStyle(node, att, val, style)
```

#### 设置样式

```javascript
TDom.setStyles(el, hash)
```

#### 获取页面尺寸

```javascript
TDom.getPageSize()
```
