## DOM 文档操作

### 使用指南

``` javascript
import { TDom } from '@hk591/h5-ui';
```

### 代码演示

#### 插入到目标元素之后

```javascript
TDom.insertAfter(newEl:HTMLElement, targetEl:HTMLElement)
```

#### 移除类名

```javascript
TDom.remove(el: HTMLElement | NodeList | string)
```

#### 获取元素高度（包含外边框）

```javascript
TDom.outerHeight(el: HTMLElement)
```

#### 获取元素宽度（包含外边框）

```javascript
TDom.outerWidth(el: HTMLElement)
```

#### 获取元素高度（包含margin）

```javascript
TDom.outerHeightWithMargin(el: HTMLElement)
```

#### 获取元素宽度（包含margin）

```javascript
TDom.outerWidthWithMargin(el: HTMLElement)
```

#### 获取渲染后的样式

```javascript
TDom.getComputedStyles(el: HTMLElement): { [key: string]: any }
```

#### 获取元素距离文档边界的距离（如果文档设置了边框，以内边框为参照）

```javascript
TDom.getOffset(el: HTMLElement)
```

#### 返回当前元素相对于关系为offsetParent的节点的位置

```javascript
TDom.getPosition(el: HTMLElement)
```

#### 设置单个属性样式

```javascript
TDom.setStyle(node: HTMLElement, att: string, val: any, style: { [key: string]: any })
```

#### 设置样式

```javascript
TDom.setStyles(el: HTMLElement, hash: { [key: string]: any })
```

#### 获取样式

```javascript
TDom.getStyle(el:any, att:any, style:any)
```

#### 获取渲染后的样式

```javascript
TDom.getComputedStyle(el: HTMLElement, att: string)
```

#### 获取页面尺寸对象

```javascript
/*
 * {
 *   pageWidth // 页面宽度
 *   pageHeight // 页面高度
 *   windowWidth // 窗口宽度 
 *   windowHeight // 窗口高度
 * }
*/
TDom.getPageSize()
```

#### 向父级遍历元素，直到selector为止，不包含selector

```javascript
TDom.parentsUntil(el: HTMLElement, selector: string, filter: string)
```

#### 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上

```javascript
TDom.closest(el: HTMLElement, selector:any)
```

#### 判断元素是否包含某选择器

```javascript
TDom.is(el: HTMLElement, selector: string)
```

#### 获取元素宽度，不包含边框和边距

```javascript
TDom.getWidth(el: HTMLElement)
```

#### 获取元素高度，不包含边框和边距

```javascript
TDom.getHeight(el: HTMLElement)
```

#### 页面是否滚动到底部

```javascript
TDom.isScrollToBottom()
```

#### 元素距离页面顶部的距离

```javascript
TDom.getOffsetTop(elem: HTMLElement)
```
