<template>
    <demo-section>
        <demo-block title="基本用法">
            <div style="padding: 0 10px;">
                <h5-lottie :width="50" :height="50" :options="{
                    path: '/lottie-vr/data.json' }"
                />

                <h5-lottie :width="50" :height="50" :options="{
                    path: '/lottie-newhouse/data.json' }" @animCreated="animCreated()"
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
        animCreated() {
            console.log('animCreated');
        }
    }
};
</script>
