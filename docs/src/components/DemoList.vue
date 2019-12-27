<template>
    <div class="side-nav">
        <template
            v-for="item in navList"
            v-if="item.showInMobile"
        >
            <mobile-nav
                v-for="(group, index) in item.groups"
                :group="group"
                :base="$active"
                :key="index"
            />
        </template>
    </div>
</template>

<script>
import docConfig from '../doc.config';
import MobileNav from './MobileNav';

export default {
    components: {
        MobileNav
    },

    data() {
        return {
            docConfig
        };
    },

    computed: {
        navList() {
            return this.docConfig[this.$active].nav || [];
        },
    }
};
</script>

<style lang="less">
@import '../../packages/_style/var';

.side-nav {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 15px 20px;

    .zanui-title,
    .zanui-desc {
        text-align: center;
        font-weight: normal;
        user-select: none;
    }

    .zanui-title {
        margin: 0 0 15px;

        img,
        span {
            display: inline-block;
            vertical-align: middle;
        }

        img {
            width: 36px;
        }

        span {
            font-size: 40px;
            margin-left: 15px;
            font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        }
    }

    .zanui-desc {
        font-size: 14px;
        color: #455a64;
        margin: 0 0 60px;
    }
}

.mobile-switch-lang {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 11px;
    border: 1px solid @blue;
    border-radius: 3px;
    color: @blue;
    cursor: pointer;

    span {
        width: 32px;
        line-height: 22px;
        text-align: center;
        display: inline-block;

        &.active {
            color: @white;
            background-color: @blue;
        }
    }
}
</style>
