## Album 相册

### 引入
``` javascript
import { Album, SwipeSwitch } from '@hk591/h5-ui';

Vue.use(Album).use(SwipeSwitch);
```

### 代码演示

#### 基础用法

```html
<!-- template -->
<template>
  <h5-swipe 
    ref="swiper"
    class="imgList"
    :show-indicators="indicators"
    @change="onSwipeChange">
      <template v-for="(imgType, parentIndex) in swiperList">
          <h5-swipe-item
            v-for="(item, childIndex) in imgType.img" 
            :key="`${imgType.name}-${childIndex}`" 
            :data-type="`${item.type ? item.type : 'image'}-${childIndex}`" 
            @click="goImgDisplay(item, parentIndex, childIndex)">
              <img 
                v-lazy="item.thumb"
                src="https://newhouse.debug.591.com.hk/_nuxt/img/5575d6e.png"
                :alt="`${imgType.name}`">
              <div id="img-logo" class="img-logo" :class="getTypeClass(item.type)" />
          </h5-swipe-item>
      </template>
      <template #indicator>
          <h5-swipe-switch 
            v-model="switchCurrentVal"
            :types="swiperTypes"
            @change="onSwitchChange" />
          <div class="custom-indicator">{{ swiperCurrent + 1 }}/{{ count(swiperList) }}</div>
      </template>
  </h5-swipe>

  <h5-album
      v-if="showAlbum"
      :type-index="typeIndex"
      :pos-index="posIndex"
      :swiper-list="swiperList"
      :show-preview.sync="showPreview"
      @close="showAlbum = false"
  >
      <div slot="footer" class="footer">底部banner</div>
      <div class="album-logo" slot="vr">vr-logo</div>
      <div class="album-logo" slot="video">video-logo</div>
      <div class="disclaimer-btn" v-show="showPreview">免责声明</div>
  </h5-album>
</template>
```

swiperList必须符合以下数据格式
```js
const swiperList = [
    {
        name: '720环景',
        img: [
            {
                type: 'vr',
                link_url: '',
                src: '',
                thumb: ''，
                note: '',
            },
        ]
    },
    {
        name: '视频',
        img: [
            {
                type: 'video',
                link_url: '',
                src: '',
                thumb: ''，
                note: '',
            },
        ]
    },
    {
        name: '示範單位',
        img: [
            {
                type: '', // 图片类型，传空字符串
                src: '',
                thumb: '',
                note: ''
            },
        ]
    }
];
```

### Album API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| type-index | 初始显示的类别索引 | `Number` | - |
| pos-index | 初始显示的在所属类别中所在的索引 | `Number` | - |
| swiper-list | 轮播数据 | `Array` | [] |
| show-preview.sync | 是否打开大图预览模式 | `Boolean` | `true` |
| nav-right-text | 导航右侧文本 | `String` | `全部圖像` |
| show-nav-right | 是否显示导航右侧 | `Boolean` | `true` |

### Album Event

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| close | 点击返回按钮 | - | - |

### Album 插槽

| 名称 | 说明 | slot-scope |
|------|------|------|
| default | 自定义区域 | - |
| footer | 底部区域 | - |
| video | video图标 | - |
| vr | vr图标 | - |

### SwipeSwitch API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| v-model | 当前显示类型 | `Number` | - |
| types | 可能的类型数据 | `Array` | - |

### SwipeSwitch Event

| 参数 | 说明 | 回调参数 |
|------|------|------|
| change | 类型改变时触发 | type：改变后的类型 |
