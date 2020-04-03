## SharePopup 分享弹窗

### 引入
``` javascript
import { SharePopup, SharePopupItem } from 'h5-ui';

Vue.use(SharePopup).use(SharePopupItem);
```

### 代码演示

#### 基础用法
```html
<h5-button @click="showSharePopup1=true;">弹出分享弹窗</h5-button>

<h5-share-popup 
    v-model="showSharePopup1" 
    :showPanel.sync="showPanel1"
    panelTip="長按拷貝下面鏈接，去貼上給好友吧："
    :panelContent="`1111<br/>2222`">
        <h5-share-popup-item 
            :imgSrc="require('./images/Facebook.png')" 
            text="Facebook">
        </h5-share-popup-item>
</h5-share-popup>
```

#### 自定义panel
```html
<h5-button @click="showSharePopup2=true;">弹出自定义分享弹窗</h5-button>

<h5-share-popup
    v-model="showSharePopup2" 
    :showPanel.sync="showPanel2">
        <template v-slot:panel>
            <div style="position: absolute; top: 0; padding: 20px; width: 100%; height: 128px; background: #fff; box-sizing: border-box;">自定义内容</div>
        </template>
</h5-share-popup>
```

### SharePopup API
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|------|
| v-model | 当前组件是否显示 | `Boolean` |
| showPanel.sync | 是否打开面板 | `Boolean` |

### SharePopupItem  API
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| imgSrc | 项目图片地址 | `String` | - |
| text | 项目描述内容 | `String` | - |
