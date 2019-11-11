## Date 日期操作

### 使用指南

``` javascript
import { ToolDate } from 'h5-ui';
```

### 代码演示

#### 日期对象转字符串

```javascript
ToolDate.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

#### 作为 filter 使用

```javascript
export default {
  filters: {
    dateFormat: ToolDate.dateFormat
  }
}
```
