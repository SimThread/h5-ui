## FilterArea 筛选区

### 使用指南
``` javascript
import { FilterArea, FilterAreaPannel, Select } from 'h5-ui';

Vue.use(FilterArea).use(FilterAreaPannel).use(Select);
```

### 代码演示

#### 基础用法

默认情况下启用关闭标签，可以通过`v-model`绑定当前激活的标签索引

```html
<h5-filter-area 
  type="devision" 
  v-model="activeIndex" 
  :closeOnClickOverlay="true">

  <h5-filter-area-panel 
    :immediateRender="true" 
    :title="area.title" 
    style="position: relative;z-index: 9999;">
    <h5-select 
      ref="areaSelect" 
      :columns="area.options" 
      @change="onChange" 
      value-key="text">
      <div slot="footer" class="estate-footer">
        共找到<span class="count fc-org">12133</span>間房屋 
        <span class="btn btn-warning" id="filterAreaSubmit" @click="complete()">完成</span>
        <span class="btn btn-link" id="resetArea" @click="resetArea()">重置</span></div>
    </h5-select>
  </h5-filter-area-panel>

  <h5-filter-area-panel 
    :immediateRender="true" 
    :title="price.title" 
    style="position: relative;z-index: 9999;">
    <h5-select 
      ref="priceSelect" 
      :columns="price.options" 
      value-key="text" 
      @change="onPriceChange" 
      :default-index="price.defaultIndex">
      <div slot="footer" class="price-footer">
        <input type="text" class="min-price" v-model="minPrice"> ~
        <input type="text" class="max-price" v-model="maxPrice"> 元
        <span class="btn" @click="onPriceConfirm(minPrice, maxPrice)">确定</span>
      </div>
    </h5-select>
  </h5-filter-area-panel>

  <h5-filter-area-panel 
    :immediateRender="true" 
    :title="age.title" 
    style="position: relative;z-index: 9999;">
    <h5-select 
      ref="ageSelect" 
      :columns="age.options" 
      @change="onAgeChange"></h5-select>
  </h5-filter-area-panel>

  <h5-filter-area-panel 
    :immediateRender="true" 
    :title="sort.title" 
    style="position: relative;z-index: 9999;">
    <h5-select 
      ref="sortSelect" 
      :columns="sort.options" 
      @change="onSortChange"></h5-select>
  </h5-filter-area-panel>
</h5-filter-area>
```

```js
export default {
  data() {
    return {
      ...
    };
  }
}
```

#### 点击事件

可以在`h5-filter-area`上绑定`click`事件，事件传参为标签对应的索引和标题

```html
<h5-filter-area @click="onClick">
  <h5-filter-area-panel title="标签 1">内容 1</h5-filter-area-panel>
  <h5-filter-area-panel title="标签 2">内容 2</h5-filter-area-panel>
</h5-filter-area>
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

#### 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶

```html
<h5-filter-area v-model="active" sticky>
  <h5-filter-area-panel v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </h5-filter-area-panel>
</h5-filter-area>
```

#### 自定义标签

通过 title 插槽可以自定义标签内容

```html
<h5-filter-area v-model="active">
  <h5-filter-area-panel v-for="index in 2">
    <div slot="title">
      <h5-icon name="more-o" />选项
    </div>
    内容 {{ index }}
  </h5-filter-area-panel>
</h5-filter-area>
```

### h5-filter-area API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| v-model | 当前标签的索引 | `String` `Number` | `0` | - |
| color | 标签颜色 | `String` | `#f44` | - |
| type | 样式类型，可选值为`card` | `String` | `line` | - |
| duration | 动画时间，单位秒 | `Number` | `0.3` | - |
| line-width | 底部条宽度，单位 px | `Number` | - | - |
| line-height | 底部条高度，单位 px | `Number` | 3 | - |
| swipeable | 是否开启手势滑动切换 | `Boolean` | `false` | - |
| sticky | 是否使用粘性定位布局 | `Boolean` | `false` | - |
| offset-top | 粘性定位布局下与顶部的最小距离，单位 px | `Number` | `0` | - |
| swipe-threshold | 滚动阈值，标签数量超过多少个可滚动 | `Number` | `4` | - |
| animated | 是否开启切换标签内容时的转场动画 | `Boolean` | `false` | - |
| ellipsis | 是否省略过长的标题文字 | `Boolean` | `true` | - |

### h5-filter-area-panel API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| title | 标题 | `String` | - | - |
| disabled | 是否禁用标签 | `Boolean` | `false` | - |

### h5-filter-area-panel Slot

| 名称 | 说明 |
|------|------|
| - | 标签页内容 |
| title | 自定义标签 |

### h5-filter-area Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击标签时触发 | index：标签索引，title：标题 |
| change | 当前激活的标签改变时触发 | index：标签索引，title：标题 |
| disabled | 点击被禁用的标签时触发 | index：标签索引，title：标题 |
| scroll | 滚动时触发，仅在 sticky 模式下生效 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |
