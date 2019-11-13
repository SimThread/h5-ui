## Date 日期操作

### 使用指南

``` javascript
import { TUrl } from 'h5-ui';
```

### 代码演示

#### 对象转查询字符串

```javascript
TUrl.stringify({foo: 'bar'})
// returns 'foo=bar'

TUrl.stringify({foo: 'bar', baz: 'bob'}, ';', ':')
// returns 'foo:bar;baz:bob'
```

#### 查询字符串转对象

```javascript
TUrl.parse('a=b&c=d')
// returns {a: 'b', c: 'c'}
```
