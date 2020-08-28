<template>
    <demo-section class="t-dom">
        <demo-block title="insertAfter()">
            <div style="padding: 10px;">
                <div id="text" style="padding: 5px;">hello world</div>
                <h5-button id="insertAfterBtn" @click="insertAfter()">插入到目标元素之后</h5-button>
            </div>
        </demo-block>

        <demo-block title="remove()">
            <div style="padding: 10px;">
                <h5-button id="removeBtn" @click="remove()">移除元素</h5-button>
            </div>
        </demo-block>

        <demo-block title="outHeight()">
            <div style="padding: 10px;">
                <h5-button id="outHeightBtn" @click="outHeight()">获取元素高度（包含外边框）</h5-button>
            </div>
        </demo-block>

        <demo-block title="outWidth()">
            <div style="padding: 10px;">
                <h5-button id="outWidthBtn" @click="outWidth()">获取元素高度（包含外边框）</h5-button>
            </div>
        </demo-block>

        <demo-block title="outerHeightWithMargin()">
            <div style="padding: 10px;">
                <h5-button id="outerHeightWithMarginBtn" @click="outerHeightWithMargin()" style="margin: 5px;">获取元素高度（包含margin）</h5-button>
            </div>
        </demo-block>

        <demo-block title="outerWidthWithMargin()">
            <div style="padding: 10px;">
                <h5-button id="outerWidthWithMarginBtn" @click="outerWidthWithMargin()" style="margin: 5px;">获取元素宽度（包含margin）</h5-button>
            </div>
        </demo-block>

        <demo-block title="getComputedStyles()">
            <div style="padding: 10px;">
                <h5-button id="getComputedStylesBtn" @click="getComputedStyles()">获取渲染后的样式-border</h5-button>
            </div>
        </demo-block>

        <demo-block title="getOffset()">
            <div style="padding: 10px;">
                <h5-button id="getOffsetBtn" @click="getOffset()">获取元素距离文档边界的距离</h5-button>
            </div>
        </demo-block>

        <demo-block title="getPosition()">
            <div style="padding: 10px;">
                <p class="tips">返回当前元素相对于关系为offsetParent的节点的位置</p>
                <h5-button id="getPositionBtn" @click="getPosition()">获取位置</h5-button>
            </div>
        </demo-block>

        <demo-block title="setStyles()">
            <div style="padding: 10px;">
                <h5-button id="setStylesBtn" @click="setStyles()">设置样式</h5-button>
            </div>
        </demo-block>

        <demo-block title="getPageSize()">
            <div style="padding: 10px;">
                <h5-button id="getPageSizeBtn" @click="getPageSize()">获取页面尺寸对象</h5-button>
            </div>
        </demo-block>

        <demo-block title="parentsUntil()">
            <div style="padding: 10px;">
                <h5-button id="parentsUntilBtn" @click="parentsUntil()">获取页面尺寸对象</h5-button>
            </div>
        </demo-block>

        <demo-block title="closest()">
            <div style="padding: 10px;">
                <h5-button id="closestBtn" @click="closest()">获得匹配选择器的第一个祖先元素</h5-button>
            </div>
        </demo-block>

        <demo-block title="is()">
            <div style="padding: 10px;">
                <h5-button id="isBtn" @click="is()">判断元素是否包含某选择器</h5-button>
            </div>
        </demo-block>

        <demo-block title="getWidth()">
            <div style="padding: 10px;">
                <h5-button id="getWidthBtn" @click="getWidth()">获取元素宽度</h5-button>
            </div>
        </demo-block>

        <demo-block title="getHeight()">
            <div style="padding: 10px;">
                <h5-button id="getHeightBtn" @click="getHeight()">获取元素高度</h5-button>
            </div>
        </demo-block>

        <demo-block title="isScrollToBottom()">
            <div style="padding: 10px;">
                <h5-button id="isScrollToBottomBtn" @click="isScrollToBottom()">页面是否滚动到底部</h5-button>
            </div>
        </demo-block>

        <demo-block title="getOffsetTop()">
            <div style="padding: 10px;">
                <h5-button id="getOffsetTopBtn" @click="getOffsetTop()">元素距离页面顶部的距离</h5-button>
            </div>
        </demo-block>
    </demo-section>
</template>

<script>
/* eslint-disable no-alert */
// import { TDom } from 'h5-ui';
import { TDom } from '../../index';

export default {
    data() {
        return {
            showBtns: false
        };
    },
    mounted() {
    },
    methods: {
        insertAfter() {
            console.log('TDom:', TDom);
            TDom.insertAfter(document.getElementById('text'), document.getElementById('insertAfterBtn'));
        },
        remove() {
            TDom.remove(document.getElementById('removeBtn'));
        },
        outHeight() {
            alert(TDom.outerHeight(document.getElementById('outHeightBtn')));
        },
        outWidth() {
            alert(TDom.outerWidth(document.getElementById('outWidthBtn')));
        },
        outerHeightWithMargin() {
            alert(TDom.outerHeightWithMargin(document.getElementById('outerHeightWithMarginBtn')));
        },
        outerWidthWithMargin() {
            alert(TDom.outerWidthWithMargin(document.getElementById('outerWidthWithMarginBtn')));
        },
        getComputedStyles() {
            alert(TDom.getComputedStyle(document.getElementById('getComputedStylesBtn'), 'border'));
        },
        getOffset() {
            alert(JSON.stringify(TDom.getOffset(document.getElementById('getOffsetBtn'))));
        },
        getPosition() {
            alert(JSON.stringify(TDom.getPosition(document.getElementById('getPositionBtn'))));
        },
        setStyles() {
            TDom.setStyles(document.getElementById('setStylesBtn'), {
                background: '#666'
            });
        },
        getPageSize() {
            alert(JSON.stringify(TDom.getPageSize()));
        },
        parentsUntil() {
            alert(TDom.parentsUntil(document.getElementById('parentsUntilBtn'), 'html', 'body'));
            console.log(TDom.parentsUntil(document.getElementById('parentsUntilBtn'), 'html', 'body'));
        },
        closest() {
            alert(TDom.closest(document.getElementById('closestBtn'), 'div'));
        },
        is() {
            alert(TDom.is(document.getElementById('isBtn'), '#isBtn'));
        },
        getWidth() {
            alert(TDom.getWidth(document.getElementById('getWidthBtn')));
        },
        getHeight() {
            alert(TDom.getHeight(document.getElementById('getHeightBtn')));
        },
        isScrollToBottom() {
            alert(TDom.isScrollToBottom());
        },
        getOffsetTop() {
            alert(TDom.getOffsetTop(document.getElementById('getOffsetTopBtn')));
        }
    }
};
</script>

<style lang="stylus">
.t-dom {
    .showBtn {
        display: none;
    }
    .tips {
        padding: 10px;
        font-size: 12px;
        color: #bbb;
        line-height: 1.5;
    }
}
</style>
