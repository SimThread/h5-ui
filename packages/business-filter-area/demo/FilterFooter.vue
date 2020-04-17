<template>
    <div slot="footer" class="estate-footer">
        <span class="btn btn-reset" id="resetArea" @click="resetArea()">重置</span>
        <span class="btn btn-confirm" id="filterAreaSubmit" @click="complete()">確定<span class="result">（共52條結果）</span></span>
    </div>
</template>

<style lang="less">
.estate-footer {
    padding: 0 15px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 55px;
    left: 0;
    bottom: 0;
    text-align: center;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    // z-index: 21;
    background: #fff;
    .btn-reset {
        width: 100px;
        height: 45px;
        line-height: 45px;
        background: rgba(235, 235, 235, 1);
        border-radius: 3px;
        color: #666;
        font-size: 16px;
        text-align: center;
    }
    .btn-confirm {
        margin-left: 15px;
        width: 230px;
        height: 45px;
        line-height: 45px;
        color: #fff;
        background: rgba(12, 95, 254, 1);
        border-radius: 3px;
        font-size: 18px;
        text-align: center;
        .result {
            font-size: 12px;
        }
    }
}
</style>
