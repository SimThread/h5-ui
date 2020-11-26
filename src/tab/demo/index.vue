<template>
    <demo-section>
        <demo-block :title="t('basicUsage')">
            <h5-tabs v-model="active">
                <h5-tab :title="t('tab') + index" v-for="index in tabs" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('matchByName')">
            <h5-tabs v-model="activeName">
                <h5-tab name="a" :title="t('tab') + 1"> {{ t('content') }} 1 </h5-tab>
                <h5-tab name="b" :title="t('tab') + 2"> {{ t('content') }} 2 </h5-tab>
                <h5-tab name="c" :title="t('tab') + 3"> {{ t('content') }} 3 </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title2')">
            <h5-tabs>
                <h5-tab v-for="index in 8" :title="t('tab') + index" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title3')">
            <h5-tabs @disabled="onClickDisabled">
                <h5-tab v-for="index in 3" :title="t('tab') + index" :disabled="index === 2" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title4')">
            <h5-tabs type="card">
                <h5-tab v-for="index in 3" :title="t('tab') + index" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title5')">
            <h5-tabs @click="onClick">
                <h5-tab v-for="index in 2" :title="t('tab') + index" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title6')">
            <h5-tabs :active="active" sticky>
                <h5-tab :title="t('tab') + index" v-for="index in tabs" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block v-if="!isWeapp" :title="t('title7')">
            <h5-tabs :active="active">
                <h5-tab v-for="index in 2" :key="index">
                    <template #title> <h5-icon name="more-o" />{{ t('tab') }} </template>
                    {{ t('content') }} {{ index }}
                </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title8')">
            <h5-tabs animated>
                <h5-tab :title="t('tab') + index" v-for="index in tabs" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block :title="t('title9')">
            <h5-tabs :active="active" swipeable>
                <h5-tab :title="t('tab') + index" v-for="index in tabs" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>

        <demo-block v-if="!isWeapp" :title="t('title10')">
            <h5-tabs scrollspy sticky>
                <h5-tab :title="t('tab') + index" v-for="index in 8" :key="index"> {{ t('content') }} {{ index }} </h5-tab>
            </h5-tabs>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    i18n: {
        'zh-CN': {
            tab: '标签 ',
            title2: '标签栏滚动',
            title3: '禁用标签',
            title4: '样式风格',
            title5: '点击事件',
            title6: '粘性布局',
            title7: '自定义标签',
            title8: '切换动画',
            title9: '滑动切换',
            title10: '滚动导航',
            disabled: ' 已被禁用',
            matchByName: '通过名称匹配'
        },
        'en-US': {
            tab: 'Tab ',
            content: 'content of tab',
            title2: 'Swipe Tabs',
            title3: 'Disabled Tab',
            title4: 'Card Style',
            title5: 'Click Event',
            title6: 'Sticky',
            title7: 'Custom Tab',
            title8: 'Switch Animation',
            title9: 'Swipeable',
            title10: 'Scrollspy',
            disabled: ' is disabled',
            matchByName: 'Match By Name'
        }
    },

    data() {
        return {
            active: 2,
            activeName: 'b',
            tabs: [1, 2, 3, 4]
        };
    },

    methods: {
        onClickDisabled(index, title) {
            this.$toast(title + this.t('disabled'));
        },

        onClick(index, title) {
            this.$toast(title);
        }
    }
};
</script>

<style lang="less">
@import '../../style/var';

.demo-tab {
    margin-bottom: 80vh;

    .h5-tab .h5-icon {
        margin-right: 5px;
        vertical-align: -2px;
    }

    .h5-tab__pane {
        padding: 25px 20px;
        background-color: @white;
    }

    .h5-tabs--card .h5-tab__pane {
        background-color: transparent;
    }
}
</style>
