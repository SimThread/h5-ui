## 全局方法

### 使用指南
``` javascript
import { Methods } from '@hk591/h5-ui';

Vue.use(Methods);
```

### 代码演示

#### 添加千分符

```javascript
this.$h5.thousands(Number | String): void
```

#### 添加前导0

```javascript
this.$h5.addZero(num: number | string): string
```

#### ga事件统计

```javascript
this.$h5.ga(ec: string, ea:string, el:string): void
// 或者
this.$h5.ga(action: string, eventType: string, ec: string, ea: string, el: string, description: string, count: number): void
```
