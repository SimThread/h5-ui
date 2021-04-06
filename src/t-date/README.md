## Date 日期操作

### 使用指南

``` javascript
import { TDate } from '@hk591/h5-ui';
```

### 代码演示

#### 日期对象转字符串

```javascript
// 例：TDate.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
TDate.dateFormat (date: string | number | Date, fmt: string = 'YYYY-MM-DD HH:mm:ss')
```

#### 作为 filter 使用

```javascript
export default {
  filters: {
    dateFormat: TDate.dateFormat
  }
}
```

#### 将秒数转换为剩余的天数、小时、分钟、秒数
```javascript
// 例：TDate.second2Remain(1000)
TDate.second2Remain(s: number)
```
