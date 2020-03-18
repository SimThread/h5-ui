<template>
    <div class="h5-doc-header">
        <div class="h5-doc-row">
            <div class="h5-doc-header__top">
                <!-- logo -->
                <a
                    class="h5-doc-header__logo"
                    :href="config.logo.href"
                >
                    <img :src="config.logo.image">
                    <span>{{ config.logo.title }}</span>
                    <span
                        v-if="config.logo.version"
                        class="h5-doc-header__version"
                    >v{{ config.logo.version }} ©基于有赞<a href="https://youzan.github.io/vant/#/zh-CN/intro">vant-ui</a>开发</span>
                </a>
                <ul class="h5-doc-header__top-nav">
                    <li
                        v-for="(value, key) in config.nav"
                        :key="key"
                        class="h5-doc-header__top-nav-item"
                        :class="{ active: key === active }"
                    >
                        <a
                            class="h5-doc-header__top-nav-title"
                            @click="switchNav(key)"
                            :href="typeof value === 'string' ? value : 'javascript:;'"
                            :target="key === 'github' ? '_blank' : ''"
                            :class="{
                                active: key === active,
                                link: typeof value === 'string' && key !== 'github'
                            }"
                        >
                            <svg
                                v-if="key === 'github'"
                                height="28"
                                width="28"
                                class="octicon octicon-mark-github"
                                viewBox="0 0 16 16"
                                version="1.1"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                />
                            </svg>
                            <span
                                v-else-if="key === 'lang'"
                                class="h5-doc-header__top-nav-lang"
                                @click="onSwitchLang(value)"
                            >{{ value.text }}</span>
                            <span v-else>{{ key }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'h5-doc-header',

    props: {
        config: Object,
        active: String
    },

    mounted() {},

    methods: {
        onSwitchLang(lang) {
            this.$router.push(this.$route.path.replace(lang.from, lang.to));
        },
        switchNav(key) {
            if (key === 'Vue 组件') {
                this.$active = 'components';
                window.localStorage.setItem('active', 'components');
            } else if (key === 'UI设计规范') {
                this.$active = 'design';
                window.localStorage.setItem('active', 'design');
            }
        }
    }
};
</script>

<style lang="less">
@import '../style/variable.less';

.h5-doc-header {
    width: 100%;
    user-select: none;
    border-bottom: 1px solid @h5-doc-border-color;

    &__top {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 0 @h5-doc-padding;
        height: @h5-doc-header-top-height;
        line-height: @h5-doc-header-top-height;

        &-nav {
            flex: 1;
            text-align: right;

            > li {
                display: inline-block;
                position: relative;
                vertical-align: middle;
            }

            &-lang {
                padding: 0 7px;
                font-size: 14px;
                line-height: 24px;
                display: block;
                border-radius: 3px;
                text-align: center;
                color: @h5-doc-code-color;
                border: 1px solid currentColor;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                transition: 0.3s ease-in-out;

                &:hover {
                    color: @h5-doc-blue;
                }
            }

            &-item {
                margin: 0 15px;
            }

            &-title {
                display: block;
                font-size: 15px;

                svg {
                    fill: @h5-doc-code-color;
                    display: block;
                    vertical-align: middle;
                    transition: 0.3s ease-in-out;

                    &:hover {
                        fill: @h5-doc-blue;
                    }
                }

                &.link {
                    color: @h5-doc-text-color;
                    border-bottom: 1px solid transparent;
                    transition: 0.3s ease-in-out;

                    &:hover,
                    &.active {
                        color: @h5-doc-blue;
                        border-bottom-color: #19b5fe;
                    }
                }
            }

            .h5-doc-header__arrow:hover {
                color: @h5-doc-text-color;
            }

            .h5-doc-header__arrow::after {
                content: '';
                display: inline-block;
                vertical-align: middle;
                margin-top: -1px;
                margin-left: 1px;
                margin-right: -4px;
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 5px solid #ccc;
                pointer-events: none;
            }
        }
    }

    &__logo {
        display: block;

        img,
        span {
            display: inline-block;
            vertical-align: middle;
        }

        img {
            width: 40px;
            height: auto;
            margin-right: 15px;
        }

        span {
            font-size: 22px;
            color: @h5-doc-black;
            font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        }

        .h5-doc-header__version {
            font-size: 90%;
            padding-top: 7px;
            opacity: 0.7;
            margin-left: 3px;
            line-height: 1;
        }
    }

    &__bottom {
        height: @h5-doc-header-bottom-height;
        line-height: @h5-doc-header-bottom-height;

        &-nav {
            text-align: center;

            li {
                display: inline-block;
            }

            a {
                color: #fff;
                opacity: 0.8;
                display: block;
                padding: 0 20px;
                font-size: 14px;

                &.active {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                &:hover,
                &.active {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
