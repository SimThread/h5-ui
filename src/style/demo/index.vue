<script setup lang="ts">
// import VanCell from '../../cell';
import { ref } from 'vue';
</script>

<template>
  <div>123</div>
</template>

<style lang="less">
.demo-style {
  .van-ellipsis,
  .van-multi-ellipsis--l2 {
    max-width: 300px;
    margin-left: var(--van-padding-md);
    font-size: 14px;
    line-height: 18px;
  }

  .van-ellipsis {
    margin-bottom: var(--van-padding-md);
  }

  .van-hairline--top {
    height: 30px;
    background-color: var(--van-white);

    &::after {
      top: 5px;
    }
  }

  .demo-animate-block {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    background-color: var(--van-blue);
    border-radius: 8px;
  }
}
</style>
