<template>
    <demo-section>
        <demo-block :title="$t('basicUsage')">
            <h5-panel
                :title="$t('title')"
                :desc="$t('desc')"
                :status="$t('status')"
            >
                <div>{{ $t('content') }}</div>
            </h5-panel>
        </demo-block>

        <demo-block :title="$t('advancedUsage')">
            <h5-panel
                :title="$t('title')"
                :desc="$t('desc')"
                :status="$t('status')"
            >
                <div>{{ $t('content') }}</div>
                <div slot="footer">
                    <h5-button size="small">{{ $t('button') }}</h5-button>
                    <h5-button
                        size="small"
                        type="danger"
                    >
                        {{ $t('button') }}
                    </h5-button>
                </div>
            </h5-panel>
        </demo-block>
    </demo-section>
</template>

<script>
export default {};
</script>

<style lang="less">
.demo-panel {
    .h5-panel__footer {
        text-align: right;

        .h5-button {
            margin-left: 5px;
        }
    }

    .h5-panel__content {
        padding: 20px;
    }
}
</style>
