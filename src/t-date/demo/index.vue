<template>
  <demo-section class="date-section">
    <demo-block title="dateFormat()">
      <input
        class="demo-input"
        type="text"
        name=""
        id=""
        v-model="value"
        placeholder="请输入转换格式，默认为：YYYY-MM-DD HH:mm:ss"
      />
      <p class="demo-result">
        <span style="padding: 10px"
          >结果：{{ testDateFormat(new Date(), value) }}</span
        >
      </p>
    </demo-block>

    <demo-block title="second2Remain()">
      <input
        class="demo-input"
        type="text"
        name=""
        id=""
        v-model="value1"
        placeholder="请输入秒数"
      />
      <p class="demo-result">
        <h5-button @click="testSecond2Remain">获取</h5-button>
      </p>
    </demo-block>
  </demo-section>
</template>

<script>
/* eslint-disable no-alert */
// import { TDate } from 'h5-ui';
import TDate from '../index';

export default {
  data() {
    return {
      value: '',
      result: '',
      value1: '',
    };
  },
  mounted() {},
  methods: {
    testDateFormat(...args) {
      return TDate.dateFormat(...args);
    },
    testSecond2Remain() {
      alert(JSON.stringify(TDate.second2Remain(this.value1 | 0)));
    },
  },
};
</script>

<style lang="less">
.date-section {
  .demo-input {
    width: 100%;
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #323233;
    font-size: 14px;
    overflow: hidden;
    border: none;
  }
  .demo-result {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    text-align: right;
  }
}
</style>
