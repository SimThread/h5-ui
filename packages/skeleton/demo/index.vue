<template>
    <demo-section>
        <demo-block title="基础用法">
            <h5-skeleton title :row="3" />
        </demo-block>

        <demo-block :title="t('showAvatar')">
            <h5-skeleton title avatar :row="3" />
        </demo-block>

        <demo-block :title="t('showChildren')">
            <h5-switch v-model="show" size="24px" />
            <h5-skeleton title avatar :row="3" :loading="!show">
                <div class="demo-preview">
                    <img src="https://img.yzcdn.cn/vant/logo.png">
                    <div class="demo-content">
                        <h3>{{ t('title') }}</h3>
                        <p>{{ t('desc') }}</p>
                    </div>
                </div>
            </h5-skeleton>
        </demo-block>

        <demo-block title="首页">
            <h5-skeleton home :home-items="7" />
        </demo-block>

        <demo-block title="列表">
            <h5-skeleton list reverse row="4" :list-items="3" />
        </demo-block>

        <demo-block title="详情">
            <h5-skeleton detail top-row="3" bottom-row="3" />
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    i18n: {
        'zh-CN': {
            showAvatar: '显示头像',
            showChildren: '显示子组件',
            title: '关于 Vant',
            desc: 'Vant 是一套轻量、可靠的移动端 Vue 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。'
        },
        'en-US': {
            showAvatar: 'Show Avatar',
            showChildren: 'Show Children',
            title: 'About Vant',
            desc: 'Vant is a set of Mobile UI Components built on Vue.'
        }
    },
    data() {
        return {
            show: false
        };
    }
};
</script>

<style lang="less">
@import '../../_style/var';
.demo-skeleton {
    background-color: @white;
    .h5-switch {
        margin: 0 @padding-md @padding-xs;
    }
    .demo-preview {
        display: flex;
        padding: 0 @padding-md;
        .demo-content {
            padding-top: 6px;
            h3 {
                margin: 0;
                font-size: 18px;
                line-height: 20px;
            }
            p {
                margin: 13px 0 0;
                font-size: 14px;
                line-height: 20px;
            }
        }
        img {
            flex-shrink: 0;
            width: 32px;
            height: 32px;
            margin-right: @padding-md;
        }
    }
}
</style>
