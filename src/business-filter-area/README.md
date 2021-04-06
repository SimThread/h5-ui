## BusinessFilterArea 新筛选区

### 引入
``` javascript
import { BusinessFilterArea, BusinessFilterAreaPanel, BusinessSelect } from '@hk591/h5-ui';

Vue.use(BusinessFilterArea).use(BusinessFilterAreaPanel).use(BusinessSelect);
```

### 代码演示

#### 基础用法

默认情况下启用关闭，可以通过`v-model`绑定当前激活的筛选面板

```html
<h5-business-filter-area
  v-model="activeIndex" 
  :closeOnClickOverlay="true">

  <h5-business-filter-area-panel 
    title="标题">

    <h5-business-select 
      ref="select" 
      :columns="options" 
      @change="onChange" 
      value-key="text">
      <div slot="footer">
        底部区域
      </div>
    </h5-business-select>

  </h5-business-filter-area-panel>

</h5-business-filter-area>
```

其中`h5-business-filter-area-panel`为面板组件，用于放置不同内容，例如区域筛选面板、面积筛选面板、排序筛选面板；`h5-business-select`为级联筛选栏，例如区域、港铁、排序等筛选需要用到，由`vant`的`picker`组件改造而来

#### 粘性布局
注意：可能存在问题，建议使用`vant-ui`的`Sticky`组件

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶

```html
<h5-business-filter-area v-model="active" sticky>
  <h5-business-filter-area-panel v-for="index in 4" :title="'选项 ' + index">
    内容 {{ index }}
  </h5-business-filter-area-panel>
</h5-business-filter-area>
```

#### 自定义筛选面板标题

通过 title 插槽可以自定义筛选面板标题

```html
<h5-business-filter-area v-model="active">
  <h5-business-filter-area-panel>
    <template #title>
        <div>
            <span>区域</span>
            <h5-icon name="triangle-down" />
        </div>
    </template>
  </h5-business-filter-area-panel>
</h5-business-filter-area>
```

#### BusinessSelect进行全选
选中某项的时候全选其他选项，可以设置BusinessSelect组件的columns数据为`selectAll`为`true`实现，例如
```html
<template>
  <h5-business-select :columns="options"></h5-business-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          values: [
            {
              selectAll: true, // 设置这个
              id: 0,
              type: "district",
              data: {
                  number: areaOption.data.number
              },
              text: "不限"
            }
          ],
          defaultIndex: -1
        }
      ]
    }
  }
}
</script>
```

#### BusinessSelect进行数据切换
例如点击一级栏目港铁的时候，二级栏目数据切换到港铁数据；点击一级栏目地区的时候，二级栏目数据切换到地区数据。可以通过设置BusinessSelect的ref来获取picker实例，picker实例的方法见下面`BusinessSelect 方法`。


#### BusinessSelect进行多选
设置options的项目属性`multiple`为`true`

```html
<template>
  <h5-business-select :columns="options"></h5-business-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
          {
              values: [],
              className: 'column1',
              defaultIndex: -1
          },
          {
              values: [],
              className: 'column2',
              defaultIndex: [],
              multiple: true // 关键
          }
      ]
    }
  }
}
</script>
```

### BusinessFilterArea API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| v-model | 需要显示的h5-business-filter-area-panel组件的索引，为-1的时候都不显示  | `String` `Number` | `0` |
| sticky | 是否使用粘性定位布局 | `Boolean` | `false` |
| offset-top | 粘性定位布局下与顶部的最小距离，单位 px | `Number` | `0` |
| ellipsis | 是否省略过长的标题文字，如果标题使用自定义插槽，则无效 | `Boolean` | `true` |

### BusinessFilterArea Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| click-overlay | 点击筛选器蒙版时触发 | - |
| change | 当前激活的标签改变时触发 | index：标签索引，title：标题 |
| scroll | 滚动时触发，仅在 sticky 模式下生效 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |

### BusinessFilterAreaPanel API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| title | 标题 | `String` | - |
| delay-render | 是否延迟渲染，动态获取数据时可能用到 |
| highlight | 是否高亮标题 |
| disabled | 是否禁用标签 | `Boolean` | `false` |

### BusinessFilterAreaPanel Slot

| 名称 | 说明 |
|------|------|
| - | 筛选面板内容 |
| title | 自定义标题 |

### BusinessSelect Event

| 名称 | 说明 | 回调参数 |
|------|------| ------ |
| change | 选项改变时触发 | 单列：Picker 实例，选中值，选中值对应的索引 <br>多列：Picker 实例，所有列选中值，当前列对应的索引 |

### BusinessSelect API

`columns`的数据格式可参考[vant picker](https://vant-contrib.gitee.io/vant/#/zh-CN/picker)

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| columns | 选项对应的数据 | `Array` | - |
| value-key | 选项文本对应的字段 | `String` | - |
| render-item | 选项渲染函数 | `Function`或`null` | null |

### BusinessSelect 方法
通过 ref 可以获取到 Picker 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| getValues | 获取所有列选中的值 | - | values |
| setValues | 设置所有列选中的值 | values | - |
| getIndexes | 获取所有列选中值对应的索引 | - | indexes |
| setIndexes | 设置所有列选中值对应的索引 | indexes | - |
| getColumnValue | 获取对应列选中的值 | columnIndex | value |
| setColumnValue | 设置对应列选中的值 | columnIndex, value | - |
| getColumnIndex | 获取对应列选中项的索引 | columnIndex | optionIndex |
| setColumnIndex | 设置对应列选中项的索引 | columnIndex, optionIndex | - |
| getColumnValues | 获取对应列中所有选项 | columnIndex | values |
| setColumnValues | 设置对应列中所有选项 | columnIndex, values | - |

### BusinessSelect slot

| 名称 | 说明 |
|------|------|
| footer | 底部区域 |

