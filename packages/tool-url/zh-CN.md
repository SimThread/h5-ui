## Date 日期操作

### 使用指南

``` javascript
import { ToolURL } from 'h5-ui';
```

### 代码演示

#### 对象转查询字符串

```javascript
ToolURL.stringify({foo: 'bar'})
// returns 'foo=bar'

ToolURL.stringify({foo: 'bar', baz: 'bob'}, ';', ':')
// returns 'foo:bar;baz:bob'
```

#### 查询字符串转对象

```javascript
ToolURL.parse('a=b&c=d')
// returns {a: 'b', c: 'c'}
```
