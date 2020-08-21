<template>
    <demo-section>
        <demo-block title="日期对象转字符串">
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
    </demo-section>
</template>

<script>
// import { TDate } from 'h5-ui';
import { TDate } from '../../index.ts';

console.log('TDate:', TDate);

export default {
    filters: {
        dateFormat: TDate.dateFormat
    },
    data() {
        return {
            value: '',
            result: ''
        };
    },
    mounted() {
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
