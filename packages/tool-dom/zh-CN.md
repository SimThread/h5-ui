## DOM 文档操作

### 使用指南

``` javascript
import { ToolDOM } from 'h5-ui';
```

### 代码演示

#### 添加类名

```javascript
ToolDOM.addClass(el, className)
```

#### 移除类名

```javascript
ToolDOM.removeClass(el, className)
```

#### 是否含有类名

```javascript
ToolDOM.hasClass(el, className)
```

#### 切换类名

```javascript
ToolDOM.toggleClass(el, className)
```

#### 插入到目标元素之后

```javascript
ToolDOM.insertAfter(newEl, targetEl)
```

#### 移除元素

```javascript
ToolDOM.remove(el)
```

#### 获取元素高度（包含外边框）

```javascript
ToolDOM.outerHeight(el)
```

#### 获取元素高度（包含margin）

```javascript
ToolDOM.outerHeightWithMargin(el)
```

#### 获取元素宽度（包含外边框）

```javascript
ToolDOM.outerWidth(el)
```

#### 获取元素宽度（包含margin）

```javascript
ToolDOM.outerWidthWithMargin(el)
```

#### 获取渲染后的样式

```javascript
ToolDOM.getComputedStyles(el)
```

#### 获取元素距离文档边界的距离（如果文档设置了边框，以内边框为参照）

```javascript
ToolDOM.getOffset(el)
```

#### 返回当前元素相对于关系为offsetParent的节点的位置

```javascript
ToolDOM.getPosition(el)
```

#### 设置样式

```javascript
ToolDOM.setStyle(node, att, val, style)
```

#### 设置样式

```javascript
ToolDOM.setStyles(el, hash)
```

#### 获取页面尺寸

```javascript
ToolDOM.getPageSize()
```
