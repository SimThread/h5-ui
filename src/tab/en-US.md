## Tab

### Install
``` javascript
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
```

### Usage

#### Basic Usage

The first tab is actived by default, you can set `v-model` to active specified tab.

```html
<h5-tabs v-model="active">
  <h5-tab v-for="index in 4" :title="'tab' + index">
    content of tab {{ index }}
  </h5-tab>
</h5-tabs>
```

```js
export default {
  data() {
    return {
      active: 2
    };
  }
}
```

#### Swipe Tabs

By default more than 4 tabs, you can scroll through the tabs. You can set `swipe-threshold` attribute to customize threshold number.

```html
<h5-tabs>
  <h5-tab v-for="index in 8" :title="'tab' + index">
    content of tab {{ index }}
  </h5-tab>
</h5-tabs>
```

#### Disabled Tab

You can set `disabled` attribute on the corresponding `h5-tab`. 

```html
<h5-tabs @disabled="onClickDisabled">
  <h5-tab v-for="index in 3" :title="'tab' + index" :disabled="index === 2">
    content of tab {{ index }}
  </h5-tab>
</h5-tabs>
```

```javascript
export default {
  methods: {
    onClickDisabled(index, title) {
      this.$toast(title + ' is disabled');
    }
  }
};
```

#### Card Style

Tabs styled as cards.

```html
<h5-tabs type="card">
  <h5-tab v-for="index in 3" :title="'tab' + index">
    content of tab {{ index }}
  </h5-tab>
</h5-tabs>
```

#### Click Event

```html
<h5-tabs @click="onClick">
  <h5-tab v-for="index in 2" :title="'tab' + index">
    content of tab {{ index }}
  </h5-tab>
</h5-tabs>
```

```javascript
export default {
  methods: {
    onClick(index, title) {
      this.$toast(title);
    }
  }
};
```

#### Sticky
In sticky mode, the tab will be fixed to top when scroll to top

```html
<h5-tabs v-model="active" sticky>
  <h5-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </h5-tab>
</h5-tabs>
```

#### Custom title
Use title slot to custom tab title

```html
<h5-tabs v-model="active">
  <h5-tab v-for="index in 2">
    <div slot="title">
      <van-icon name="more-o" />tab
    </div>
    content {{ index }}
  </h5-tab>
</h5-tabs>
```

#### Switch Animation

Use `animated` props to change tabs with animation

```html
<h5-tabs v-model="active" animated>
  <h5-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </h5-tab>
</h5-tabs>
```

#### Swipeable

In swipeable mode, you can switch tabs with swipe gestrue in the content

```html
<h5-tabs v-model="active" swipeable>
  <h5-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </h5-tab>
</h5-tabs>
```

### Tabs API

| Attribute | Description | Type | Default |
|------|------|------|------|
| v-model | Index of active tab | `String` `Number` | `0` |
| color | Tab color | `String` | `#f44` |
| type | Can be set to `line` `card` | `String` | `line` |
| duration | Toggle tab's animation time | `Number` | `0.3` | - |
| line-width | Width of tab line (px) | `Number` | Width of active tab |
| line-height | Height of tab line (px) | `Number` | 3 |
| swipe-threshold | Set swipe tabs threshold | `Number` | `4` | - |
| sticky | Whether to use sticky mode | `Boolean` | `false` |
| offset-top | Offset top when use sticky mode | `Number` | `0` |
| swipeable | Whether to switch tabs with swipe gestrue in the content | `Boolean` | `false` |
| animated | Whether to change tabs with animation | `Boolean` | `false` |
| ellipsis | Whether to ellipsis too long title | `Boolean` | `true` |

### Tab API

| Attribute | Description | Type | Default |
|------|------|------|------|
| title | Title | `String` | - |
| disabled | Whether to disable tab | `Boolean` | `false` |

### Tab Slot

| name | Description |
|------|------|
| - | Content |
| title | Custom tab |

### Tabs Event

| Event | Description | Arguments |
|------|------|------|
| click | Triggered when click tab | index：index of current tab，title: tab title |
| change | Triggered when active tab changed | index：index of current tab，title: tab title |
| disabled | Triggered when click disabled tab | index：index of current tab, title: tab title |
| scroll | Triggered when tab scroll in sticky mode | Object: { scrollTop, isFixed } |
