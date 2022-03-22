<template>
  <demo-section demo-name="icon">
    <h5-col v-for="icon in icons" :key="icon" span="6">
      <h5-icon :name="icon" />
      <span>{{ icon }}</span>
    </h5-col>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      icons: [
        'success',
        'plus',
        'cross',
        'fail',
        'arrow',
        'arrow-left',
        'arrow-up',
        'arrow-down',
        'triangle-up',
        'triangle-down',
        'paixu',
      ],
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-icon {
  font-size: 0;

  &-list {
    padding-top: 10px;
    box-sizing: border-box;
    min-height: calc(100vh - 65px);
  }

  .h5-col {
    float: none;
    text-align: center;
    height: 100px;
    display: inline-block;
    vertical-align: middle;

    span {
      display: block;
      padding: 0 5px;
      font-size: 12px;
      line-height: 14px;
    }
  }

  .h5-icon {
    font-size: 32px;
    margin: 15px 0;
    color: @text-color;
  }

  .h5-tab__pane {
    padding-top: 10px;
  }
}
</style>
