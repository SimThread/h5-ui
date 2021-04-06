<template>
    <demo-section>
        <demo-block title="基本用法">
            <h5-progress :percentage="50" />
        </demo-block>

        <demo-block title="置灰">
            <h5-progress
                inactive
                :percentage="50"
            />
        </demo-block>

        <demo-block title="样式定制">
            <h5-progress
                color="#f2826a"
                :percentage="25"
                pivot-text="橙色"
            />
            <h5-progress
                color="#f44"
                :percentage="50"
                pivot-text="红色"
            />
            <h5-progress
                :percentage="75"
                pivot-text="紫色"
                pivot-color="#7232dd"
                color="linear-gradient(to right, #be99ff, #7232dd)"
            />
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    i18n: {
        'zh-CN': {
            title2: '置灰',
            title3: '样式定制'
        },
        'en-US': {
            title2: 'Inactive',
            title3: 'Custom Style'
        }
    }
};
</script>

<style lang="less">
.demo-progress {
    .h5-progress {
        margin: 20px;

        &:first-of-type {
            margin-top: 5px;
        }
    }
}
</style>
