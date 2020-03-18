<template>
    <div class="h5-doc-block">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'h5-doc-block'
};
</script>

<style lang="less">
@import '../style/variable.less';

.h5-doc-block {
    display: flex;
    margin-bottom: 20px;

    .highlight {
        flex: 1;
        box-sizing: border-box;

        pre {
            word-break: break-all;
        }
    }
}
</style>
