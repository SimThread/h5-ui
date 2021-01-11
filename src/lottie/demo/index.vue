<template>
    <demo-section>
        <demo-block title="基本用法">
            <div style="padding: 0 10px;">
                <h5-lottie :width="50" :height="50" :options="{
                    path: '/js/lottie-vr/data.json' }"
                />

                <h5-lottie :width="50" :height="50" :options="{
                    path: '/js/lottie-newhouse/data.json' }" @animCreated="animCreated()"
                />
            </div>
        </demo-block>
    </demo-section>
</template>

<script>

export default {
    data() {
        return {};
    },

    created() {

    },
    methods: {
        animCreated() {}
    }
};
</script>
