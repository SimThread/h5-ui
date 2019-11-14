## ClickOutside 点击外部

### 引入

``` javascript
import { VClickOutside } from 'h5-ui'
Vue.directive(VClickOutside);
```

### 代码演示

`v-click-outside`的接受一个函数类型的值，在点击绑定元素的外部时执行。

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

```html
<a class="check-balance" href="javascript:;"  v-click-outside="closeBalanceTip">
```