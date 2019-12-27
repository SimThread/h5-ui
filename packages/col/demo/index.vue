<template>
    <demo-section>
        <demo-block title="基础用法">
            <van-row>
                <h5-col span="8">span: 8</h5-col>
                <h5-col span="8">span: 8</h5-col>
                <h5-col span="8">span: 8</h5-col>
            </van-row>

            <van-row>
                <h5-col span="4">span: 4</h5-col>
                <h5-col
                    span="10"
                    offset="4"
                >
                    offset: 4, span: 10
                </h5-col>
            </van-row>

            <van-row>
                <h5-col
                    offset="12"
                    span="12"
                >
                    offset: 12, span: 12
                </h5-col>
            </van-row>
        </demo-block>

        <demo-block title="在列元素之间增加间距">
            <van-row gutter="20">
                <h5-col span="8">span: 8</h5-col>
                <h5-col span="8">span: 8</h5-col>
                <h5-col span="8">span: 8</h5-col>
            </van-row>
        </demo-block>

        <demo-block title="Flex 布局">
            <van-row type="flex">
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
            </van-row>

            <van-row
                type="flex"
                justify="center"
            >
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
            </van-row>

            <van-row
                type="flex"
                justify="end"
            >
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
            </van-row>

            <van-row
                type="flex"
                justify="space-between"
            >
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
            </van-row>

            <van-row
                type="flex"
                justify="space-around"
            >
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
                <h5-col span="6">span: 6</h5-col>
            </van-row>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
};
</script>

<style lang="less">
@import '../../packages/_style/var';

.demo-col {
    .van-doc-demo-block {
        padding: 0 15px;
    }

    .van-doc-demo-block__title {
        padding-left: 0;
    }

    .h5-col {
        color: @white;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 10px;
        background-clip: content-box;

        &:nth-child(odd) {
            background-color: #39a9ed;
        }

        &:nth-child(even) {
            background-color: #66c6f2;
        }
    }
}
</style>
