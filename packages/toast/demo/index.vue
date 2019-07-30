<template>
  <demo-section>
    <demo-block title="文字提示">
      <van-button @click="$toast('文字提示')">文字提示</van-button>
      <van-button @click="$toast('这是一条长文字提示，超过一定字数就会换行')">这是一条长文字提示，超过一定字数就会换行</van-button>
    </demo-block>

    <demo-block title="加载提示">
      <van-button @click="showLoadingToast">加载提示</van-button>
    </demo-block>

    <demo-block title="成功/失败提示">
      <van-button @click="showSuccessToast">成功提示</van-button>
      <van-button @click="showFailToast">失败提示</van-button>
    </demo-block>

    <demo-block title="高级用法">
      <van-button @click="showCustomizedToast">高级用法</van-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    showLoadingToast() {
      this.$toast.loading({ mask: true, message: '加载中' });
    },

    showSuccessToast() {
      this.$toast.success('成功文案');
    },

    showFailToast() {
      this.$toast.fail('失败文案');
    },

    showCustomizedToast() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '倒计时 3 秒'
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = second => `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          this.$toast.clear();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.demo-toast {
  .van-button {
    margin-left: 15px;
  }
}
</style>
