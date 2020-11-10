## ClickOutside 点击外部

### 引入

``` javascript
import { VClickOutside } from '@hk591/h5-ui'

Vue.use(VClickOutside);
```

### 基础用法

`v-click-outside`的接受一个函数类型的值，在点击绑定元素的外部时执行。

```html
<a class="check-balance" href="javascript:;"  v-click-outside="closeBalanceTip">
```

``` javascript
export default {
    data() {
        return {
            showBalancePanel: false
        }
    },
    methods: {
        closeBalanceTip() {
            this.showBalancePanel = false;
        },
    }
}
```
