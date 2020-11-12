<template>
    <demo-section>
        <demo-block title="dateFormat()">
            <h5-cell-group>
                <h5-field
                    v-model="value"
                    placeholder="请输入转换格式，默认为：YYYY-MM-DD HH:mm:ss"
                />
            </h5-cell-group>
            <p class="demo-result">
                <span style="padding: 10px;">结果：{{ new Date | dateFormat(value) }}</span>
            </p>
        </demo-block>

        <demo-block title="second2Remain()">
            <h5-cell-group>
                <h5-field
                    v-model="value1"
                    placeholder="请输入秒数"
                />
            </h5-cell-group>
            <p class="demo-result">
                <h5-button @click="testSecond2Remain">获取</h5-button>
            </p>
        </demo-block>
    </demo-section>
</template>

<script>
/* eslint-disable no-alert */
// import { TDate } from 'h5-ui';
import { TDate } from '../../index.ts';

export default {
    filters: {
        dateFormat: TDate.dateFormat
    },
    data() {
        return {
            value: '',
            result: '',
            value1: ''
        };
    },
    mounted() {
    },
    methods: {
        testSecond2Remain() {
            alert(JSON.stringify(TDate.second2Remain(this.value1 | 0)));
        }
    }
};
</script>

<style lang="stylus">
.demo-result {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    text-align: right;
}
</style>
