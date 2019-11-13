<template>
  <demo-section>
    <demo-block title="添加前导零">
        <h5-cell-group>
          <h5-field
            v-model="value1"
            placeholder="请输入数字（例：1）"
          />
        </h5-cell-group>
        <p class="demo-result">
          <span style="padding: 10px;">结果：{{ value1 | addZero }}</span>
        </p>
    </demo-block>

    <demo-block title="添加千分符">
        <h5-cell-group>
          <h5-field
            v-model="value2"
            placeholder="请输入数字（例：1000）"
          />
        </h5-cell-group>
        <p class="demo-result">
          <span style="padding: 10px;">结果：{{ value2 | thousands }}</span>
        </p>
    </demo-block>
  </demo-section>
</template>

<script>
import { TNumberFormat } from 'h5-ui';

export default {
  data() {
    return {
      value1: '',
      value2: ''
    }
  },
  filters: {
    addZero: TNumberFormat.addZero,
    thousands: TNumberFormat.thousands,
  },
  methods: {
    // dateFormat: TDate.dateFormat,
    // parseDate() {
    //   console.log(TDate.dateFormat('1994/04/08'));
    //   if (this.value) {
    //     this.result = TDate.dateFormat(new Date(), this.value);
    //   } else {
    //     this.result = TDate.dateFormat(new Date());
    //   }
    // }
  }
}
</script>

<style lang="stylus">
.demo-result {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  text-align: right;
}
</style>
