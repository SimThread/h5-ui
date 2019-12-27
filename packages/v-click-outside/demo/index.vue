<template>
    <div class="demo-wrap">
        <a class="check-balance" href="javascript:;" v-click-outside="closeBalanceTip">
            <span @click="showBalancePanel = !showBalancePanel;">查看餘額</span>
            <div class="tips-box" v-show="showBalancePanel">
                <div class="tips-arrow" />
                <p class="tips-text">
                    <span class="label">賬戶餘額</span>
                    <span><em>35000</em>點</span>
                </p>
                <p class="tips-text">
                    <span class="label">灣區體驗</span>
                    <span><em>35050</em>點</span>
                </p>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showBalancePanel: false
        };
    },
    methods: {
        closeBalanceTip() {
            this.showBalancePanel = false;
        },
    }
};
</script>

<style scoped>
.demo-wrap {
    width: 70px;
    margin: 100px auto;
}

.check-balance {
    position: relative;
    color: #888;
    text-decoration: underline;

    .tips-box {
        position: absolute;
        left: -100px;
        top: -76px;
        padding: 12px 10px;
        width: 141px;
        height: 38px;
        background: #fff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        font-size: 13px;
        border-radius: 1px;
        z-index: 1;

        .tips-arrow {
            &::before {
                content: "";
                position: absolute;
                right: 20px;
                bottom: -20px;
                width: 0;
                height: 0;
                border: 10px solid #fff;
                border-right: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 10px solid transparent;
                z-index: 999;
            }

            &::after {
                content: "";
                position: absolute;
                right: 18.5px;
                bottom: -24px;
                width: 0;
                height: 0;
                border: 12px solid rgba(0, 0, 0, .05);
                border-right: 12px solid transparent;
                border-bottom: 12px solid transparent;
                border-left: 12px solid transparent;
            }
        }

        .tips-text {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:nth-child(3) {
                margin-top: 10px;
            }

            .label {
                margin-right: 10px;
            }

            em {
                color: #ff8000;
            }
        }
    }
}
</style>
