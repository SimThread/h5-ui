<template>
    <section class="h5-doc-demo-section" :class="`demo-${demoName}`" :style="style">
        <slot />
    </section>
</template>

<script>
export default {
    name: 'h5-doc-demo-section',

    props: {
        name: String,
        title: String,
        background: String
    },

    computed: {
        demoName() {
            console.log('this.name:', this.name);
            return this.name || this.getParentName();
        },
        style() {
            return {
                background: this.background
            };
        }
    },

    methods: {
        getParentName() {
            const { $parent } = this;
            if ($parent && $parent.$options.name) {
                return $parent.$options.name.replace('demo-', '');
            }
        }
    }
};
</script>

<style>
@import '../style/variable';

.h5-doc-demo-section {
    min-height: 100vh;
    padding-bottom: 20px;
    box-sizing: border-box;

    &__title {
        margin: 0;
        padding: 15px;
        font-size: 16px;
        line-height: 1.5;
        font-weight: normal;
        text-transform: capitalize;

        + .h5-doc-demo-block {
            .h5-doc-demo-block__title {
                padding-top: 0;
            }
        }
    }
}
</style>
