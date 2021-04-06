## Tabbar

### Install
``` javascript
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
```

### Usage

#### Basic Usage

```html
<h5-tabbar v-model="active">
  <h5-tabbar-item icon="home-o">Tab</h5-tabbar-item>
  <h5-tabbar-item icon="search" dot>Tab</h5-tabbar-item>
  <h5-tabbar-item icon="friends-o" info="5">Tab</h5-tabbar-item>
  <h5-tabbar-item icon="setting-o" info="20">Tab</h5-tabbar-item>
</h5-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0
    }
  }
}
```

#### Custom icon

Use `icon` slot to custom icon

```html
<h5-tabbar v-model="active">
  <h5-tabbar-item info="3">
    <span>Custom</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.active : icon.normal"
    >
  </h5-tabbar-item>
  <h5-tabbar-item icon="search">Tab</h5-tabbar-item>
  <h5-tabbar-item icon="setting-o">Tab</h5-tabbar-item>
</h5-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  }
}
```

### Tabbar API

| Attribute | Description | Type | Default |
|------|------|------|------|
| v-model | Index of current tab | `Number` | - |
| fixed | Whether to fixed bottom | `Boolean` | `true` |
| z-index | Z-index | `Number` | `1` |
| active-color | Color of active tab item | `String` | `#1989fa` |

### Tabbar Event

| Event | Description | Arguments |
|------|------|------|
| change | Triggered when change active tab | active: index of current tab |

### TabbarItem API

| Attribute | Description | Type | Default |
|------|------|------|------|
| icon | Icon name | `String` | - |
| dot | Whether to show red dot | `Boolean` | - |
| info | Info message | `String | Number` | - |
| url | Link | `String` | - |
| to | Target route of the link, same as to of `vue-router` | `String | Object` | - |
| replace | If true, the navigation will not leave a history record | `String` | `false` |

### TabbarItem Slot

| Name | Description | slot-scope |
|------|------|------|
| icon | Custom icon | active |
