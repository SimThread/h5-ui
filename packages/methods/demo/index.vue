<template>
    <demo-section>
        <demo-block title="$thouands">
            <div>{{ $h5.$thousands(1000) }}</div>
        </demo-block>

        <demo-block title="$ga">
            <h5-button @click="test$ga()">调用$ga方法</h5-button>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    methods: {
        test$ga() {
            window.ga = function(...args) {
                // eslint-disable-next-line no-alert
                alert(args);
            };
            this.$h5.$ga('1', '2', '3');
        }
    }
};
</script>

<style lang="less">
.demo-methods {
    .h5-doc-demo-block {
        padding: 0 15px;
    }
}
</style>
