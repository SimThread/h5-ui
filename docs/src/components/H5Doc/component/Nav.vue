<template>
    <div
        class="h5-doc-nav"
        :style="style"
    >
        <div
            class="h5-doc-nav__item"
            v-for="(item, index) in navConfig"
            :key="index"
        >
            <h5-doc-nav-link
                :item="item"
                :base="base"
            />
            <div v-if="item.children">
                <div
                    class="nav-item"
                    v-for="(navItem, childrenIndex) in item.children"
                    :key="childrenIndex"
                >
                    <h5-doc-nav-link
                        :item="navItem"
                        :base="base"
                    />
                </div>
            </div>
            <div
                v-if="item.groups"
                v-for="(group, groupsIndex) in item.groups"
                :key="groupsIndex"
            >
                <div class="h5-doc-nav__group-title">{{ group.groupName }}</div>
                <div>
                    <div
                        class="h5-doc-nav__subitem"
                        v-for="(navItem, subItemIndex) in group.list"
                        :key="subItemIndex"
                        v-if="!navItem.disabled"
                    >
                        <h5-doc-nav-link
                            :item="navItem"
                            :base="base"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavLink from './NavLink.vue';

export default {
    name: 'h5-doc-nav',

    components: {
        [NavLink.name]: NavLink
    },

    props: {
        navConfig: Array,
        base: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            top: 60,
            bottom: 0
        };
    },

    computed: {
        style() {
            return {
                top: this.top + 'px',
                bottom: this.bottom + 'px'
            };
        }
    },

    created() {
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
    },

    methods: {
        onScroll() {
            const { pageYOffset: offset } = window;
            this.top = Math.max(0, 60 - offset);
        }
    }
};
</script>

<style>
@import '../style/variable';

.h5-doc-nav {
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 1;
    position: fixed;
    overflow-y: scroll;
    padding: 25px 0 75px;
    min-width: $h5-doc-nav-width;
    max-width: $h5-doc-nav-width;
    border-right: 1px solid $h5-doc-border-color;

    @media (max-width: 1300px) {
        min-width: 220px;
        max-width: 220px;
    }

    @media (min-width: $h5-doc-row-max-width) {
        left: 50%;
        margin-left: calc(-$h5-doc-row-max-width/2);
    }

    &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(69, 90, 100, 0.2);
    }

    &__item,
    &__subitem {
        a {
            margin: 0;
            display: block;
            color: #455a64;
            font-size: 16px;
            padding: 10px calc($h5-doc-padding/2) 10px $h5-doc-padding;
            line-height: 24px;
            transition: all 0.3s;

            &.active {
                color: $h5-doc-blue;
            }
        }
    }

    &__item {
        > a {
            font-weight: bold;
        }
    }

    &__subitem {
        a {
            font-size: 14px;

            &:hover {
                color: $h5-doc-blue;
            }
        }

        span {
            opacity: 0.6;
            font-size: 13px;
        }
    }

    &__group-title {
        font-size: 12px;
        line-height: 40px;
        padding-left: $h5-doc-padding;
        color: $h5-doc-text-light-blue;
    }

    @media (max-width: 1300px) {
        min-width: 220px;
        max-width: 220px;

        &__item,
        &__subitem {
            a {
                line-height: 22px;
            }
        }

        &__subitem {
            a {
                font-size: 13px;
            }
        }
    }
}
</style>
