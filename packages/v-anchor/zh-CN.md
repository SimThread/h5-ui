## Anchor 锚点

### 引入

``` javascript
import { VAnchor } from 'h5-ui'
Vue.directive(VAnchor);
```

### 代码演示

指令`v-anchor`的值与模块的id对应，例如`v-anchor="1"`,则对应的模块id为`"anchor-1"`; `anchor-distance`表示模块滚动到锚点时，距离到达的距离。

```html
<template>
    <div class="demo-wrap">
        <!-- 導航 -->
        <nav class="block detail-nav" ref="navItem" style="margin-top: 10px; position: relative; z-index: 100;">
            <div class="nav-list" :class="{'fexd-nav': isFixed}" :style="{top: `0px`}">
                <span class="nav-item active" v-anchor="1" anchor-distance="40">屋苑資料</span>
                <span class="nav-item" v-anchor="2" anchor-distance="40">成交記錄</span>
                <span class="nav-item" v-anchor="3" anchor-distance="40">相關放盤</span>
                <span class="nav-item" v-anchor="4" anchor-distance="40">相關學校</span>
                <span class="nav-item" v-anchor="5" anchor-distance="40">地圖及周邊</span>
            </div>
        </nav>

        <!-- 樓盤信息 -->
        <div class="page-block page-block1" id="anchor-1" ref="pageBlock">屋苑资料</div>

        <!-- 成交記錄 -->
        <div class="page-block page-block2" id="anchor-2" ref="pageBlock">成交記錄</div>

        <!-- 相關學校 -->
        <div class="page-block page-block3" id="anchor-3" ref="pageBlock">相關放盤</div>

        <!-- 地圖及周邊 -->
        <div class="page-block page-block4" id="anchor-4" ref="pageBlock">相關學校</div>

        <!-- 相關放盤 -->
        <div class="page-block page-block5" id="anchor-5" ref="pageBlock">地圖及周邊</div>
    </div>
</template>
```

```javascript
function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function isScrollToBottom() {
    return getScrollTop() + getWindowHeight() == getScrollHeight();
}

function getScrollTop(id) {
    let scrollTop = 0;

    if (!id) {
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
    } else {
        scrollTop = document.getElementById(id).scrollTop;
    }
    return scrollTop;
};


function getContentScrollTop () {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

export default {
    data() {
        return {
            isFixed: false
        }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$nextTick(() => {
          vm.navScroll();
        });
      });
    },
    beforeRouteLeave(to, from, next) {
        document.removeEventListener('scroll', this.onScroll);
        next();
    },
    methods: {
        // 导航滚动
        navScroll() {
            // 滚动到相对应的模块
            const navtop = this.$refs.navItem.offsetTop;
            const {
                top,
            } = this.$refs.navItem.getBoundingClientRect();

            document.addEventListener('scroll', this.onScroll);
        },
        onScroll() {
            const headHeight = document.querySelector(".h5-nav-bar__title").clientHeight;
            const navHeight = document.querySelector(".nav-list").clientHeight;
            const _h = headHeight + navHeight;
            const currtScrollTop = getScrollTop();

            // 黏連判斷
            if (currtScrollTop > (headHeight)) {
                this.isFixed = true;
            } else {
                this.isFixed = false;
            }

            document.querySelectorAll(".page-block").forEach((item, index) => {
                const _index = index;
                const _itemTop = item.getBoundingClientRect().top + window.pageYOffset;
                // +1是为了点击时能够高亮，正好距离为0时是不会高亮的
                const _h = navHeight + 1;

                // 如果到達底部,只保持最后一个元素高亮
                if (isScrollToBottom()) {
                    document.querySelectorAll(".nav-item").forEach((navItem) => {
                        navItem.classList.remove("active");
                    });
                    document.querySelectorAll(".nav-item")[document.querySelectorAll(".page-block").length - 1].classList.add("active");
                    return;
                }

                if (currtScrollTop > (_itemTop - _h)) {
                    document.querySelectorAll(".nav-item").forEach((navItem) => {
                        navItem.classList.remove("active");
                    });
                    document.querySelectorAll(".nav-item")[_index].classList.add("active");
                }
            });
        }
    }
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|------|
| anchor-distance | 到达时与顶部的距离 | `Number` | 0 |