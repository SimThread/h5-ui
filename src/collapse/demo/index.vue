<template>
    <demo-section>
        <demo-block title="基础用法">
            <h5-collapse v-model="active1">
                <h5-collapse-item title="香港591">提供丰富屋苑信息，快速找房买房</h5-collapse-item>
                <h5-collapse-item title="香港591租房">快速租房</h5-collapse-item>
                <h5-collapse-item
                    title="香港591售房"
                    disabled
                >
                    内容
                </h5-collapse-item>
            </h5-collapse>
        </demo-block>

        <demo-block title="手风琴">
            <h5-collapse
                v-model="active2"
                accordion
            >
                <h5-collapse-item title="香港591">提供丰富屋苑信息，快速找房买房</h5-collapse-item>
                <h5-collapse-item title="香港591租房">快速租房</h5-collapse-item>
                <h5-collapse-item title="香港591售房">快速买房</h5-collapse-item>
            </h5-collapse>
        </demo-block>

        <demo-block title="自定义标题内容">
            <h5-collapse v-model="active3">
                <h5-collapse-item>
                    <div slot="title">香港591<h5-icon name="question-o" /></div>
                    内容
                </h5-collapse-item>
                <h5-collapse-item
                    title="香港591租房"
                    value="内容"
                    icon="shop-o"
                >
                    快速租房
                </h5-collapse-item>
            </h5-collapse>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    data() {
        return {
            active1: [0],
            active2: 0,
            active3: []
        };
    }
};
</script>

<style lang="less">
@import '../../src/style/var';

.demo-collapse {
    .h5-icon-question-o {
        color: @blue;
        vertical-align: -3px;
        margin-left: 5px;
        font-size: 15px;
    }
}
</style>
