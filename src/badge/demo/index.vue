<script setup lang="ts">
import VanBadge from '..';
</script>

<template>
  <van-badge content="5">
    <div class="child" />
  </van-badge>
  <van-badge content="10">
    <div class="child" />
  </van-badge>
  <van-badge content="Hot">
    <div class="child" />
  </van-badge>
  <van-badge dot>
    <div class="child" />
  </van-badge>
</template>

<style lang="less">
.demo-badge {
  background-color: var(--van-white);

  .van-badge__wrapper {
    margin-left: var(--van-padding-md);
  }

  .child {
    width: 40px;
    height: 40px;
    background: var(--van-gray-2);
    border-radius: 4px;
  }

  .badge-icon {
    display: block;
    margin-left: 0;
    font-size: 10px;
    line-height: 16px;
  }
}
</style>
