<template>
    <div class="demo-wrap">
        <!-- 導航 -->
        <nav class="block detail-nav" ref="navItem" style="margin-top: 10px; position: relative; z-index: 100;">
            <div class="nav-list" :class="{ 'fexd-nav': isFixed }" :style="{ top: `0px` }">
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

<script>
function getScrollHeight() {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function getScrollTop(id) {
    let scrollTop = 0;

    if (!id) {
        if (document.documentElement && document.documentElement.scrollTop) {
            ({ scrollTop } = document.documentElement);
        } else if (document.body) {
            ({ scrollTop } = document.body);
        }
    } else {
        ({ scrollTop } = document.getElementById(id));
    }
    return scrollTop;
}

function isScrollToBottom() {
    return getScrollTop() + getWindowHeight() == getScrollHeight();
}

export default {
    data() {
        return {
            isFixed: false
        };
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
            document.addEventListener('scroll', this.onScroll);
        },
        onScroll() {
            const headHeight = document.querySelector('.h5-nav-bar__title').clientHeight;
            const navHeight = document.querySelector('.nav-list').clientHeight;
            const currtScrollTop = getScrollTop();

            // 黏連判斷
            if (currtScrollTop > headHeight) {
                this.isFixed = true;
            } else {
                this.isFixed = false;
            }

            document.querySelectorAll('.page-block').forEach((item, index) => {
                const itemIndex = index;
                const itemTop = item.getBoundingClientRect().top + window.pageYOffset;
                // +1是为了点击时能够高亮，正好距离为0时是不会高亮的
                const h = navHeight + 1;

                // 如果到達底部,只保持最后一个元素高亮
                if (isScrollToBottom()) {
                    document.querySelectorAll('.nav-item').forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-item')[document.querySelectorAll('.page-block').length - 1].classList.add('active');
                    return;
                }

                if (currtScrollTop > itemTop - h) {
                    document.querySelectorAll('.nav-item').forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-item')[itemIndex].classList.add('active');
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.detail-nav {
    height: 40px;

    .nav-list {
        display: flex;
        line-height: 40px;
        justify-content: space-between;
        padding: 0 10px;
        background-color: #fff;
        box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.08);
        box-sizing: border-box;
    }

    .fexd-nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    .nav-item {
        font-size: 12px;
        color: #333;
        cursor: pointer;

        &.active {
            position: relative;
            color: #ff8000;

            &::after {
                position: absolute;
                top: auto;
                right: 0;
                bottom: 5px;
                left: 0;
                margin: auto;
                content: '';
                width: 35px;
                height: 0;
                border-bottom: 1.5px solid #ff8000;
            }
        }
    }
}

.page-block {
    height: 400px;
    padding: 10px 10px 0;
}
</style>
