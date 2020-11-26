<template>
    <demo-section>
        <demo-block title="基本用法">
            <h5-swipe :autoplay="3000" indicator-color="white">
                <h5-swipe-item>1</h5-swipe-item>
                <h5-swipe-item>2</h5-swipe-item>
                <h5-swipe-item>3</h5-swipe-item>
                <h5-swipe-item>4</h5-swipe-item>
            </h5-swipe>
        </demo-block>

        <demo-block title="图片懒加载">
            <h5-swipe :autoplay="3000">
                <h5-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image">
                </h5-swipe-item>
            </h5-swipe>
        </demo-block>

        <demo-block title="监听 change 事件">
            <h5-swipe indicator-color="white" @change="onChange1">
                <h5-swipe-item>1</h5-swipe-item>
                <h5-swipe-item>2</h5-swipe-item>
                <h5-swipe-item>3</h5-swipe-item>
                <h5-swipe-item>4</h5-swipe-item>
            </h5-swipe>
        </demo-block>

        <demo-block title="纵向滚动">
            <h5-swipe vertical :autoplay="3000" indicator-color="white" style="height: 200px;" class="demo-swipe--vertical">
                <h5-swipe-item>1</h5-swipe-item>
                <h5-swipe-item>2</h5-swipe-item>
                <h5-swipe-item>3</h5-swipe-item>
                <h5-swipe-item>4</h5-swipe-item>
            </h5-swipe>
        </demo-block>

        <demo-block title="自定义滑块大小">
            <h5-swipe :width="300" :loop="false" indicator-color="white">
                <h5-swipe-item>1</h5-swipe-item>
                <h5-swipe-item>2</h5-swipe-item>
                <h5-swipe-item>3</h5-swipe-item>
                <h5-swipe-item>4</h5-swipe-item>
            </h5-swipe>
        </demo-block>

        <demo-block title="自定义指示器">
            <h5-swipe @change="onChange2">
                <h5-swipe-item>1</h5-swipe-item>
                <h5-swipe-item>2</h5-swipe-item>
                <h5-swipe-item>3</h5-swipe-item>
                <h5-swipe-item>4</h5-swipe-item>

                <template #indicator>
                    <div class="custom-indicator">{{ current + 1 }}/4</div>
                </template>
            </h5-swipe>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg', 'https://img.yzcdn.cn/vant/apple-3.jpg', 'https://img.yzcdn.cn/vant/apple-4.jpg']
        };
    },

    methods: {
        onChange1(index) {
            this.$toast(this.t('message') + index);
        },

        onChange2(index) {
            this.current = index;
        }
    }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-swipe {
    padding-bottom: 30px;

    .h5-swipe {
        &-item {
            color: @white;
            font-size: 20px;
            line-height: 150px;
            text-align: center;

            &:nth-child(even) {
                background-color: #39a9ed;
            }

            &:nth-child(odd) {
                background-color: #66c6f2;
            }
        }

        img {
            display: block;
            box-sizing: border-box;
            width: 100%;
            height: 240px;
            padding: 30px 60px;
            background-color: @white;
            pointer-events: none;
        }
    }

    &--vertical {
        .h5-swipe-item {
            line-height: 200px;
        }
    }

    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        color: @white;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
}
</style>
