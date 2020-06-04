## Date 日期操作

### 使用指南

``` javascript
import { TDate } from 'h5-ui';
```

### 代码演示

#### 日期对象转字符串

```javascript
TDate.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

#### 作为 filter 使用

```javascript
export default {
  filters: {
    dateFormat: TDate.dateFormat
  }
}
```
