<script setup lang="ts">
import VanSticky from '..';
// import VanButton from '../../button';
import { ref } from 'vue';

const container = ref(null);
</script>

<template>
  <div>basic</div>
  <!-- <demo-block :title="t('basicUsage')">
    <van-sticky>
      <van-button type="primary" style="margin-left: 15px">
        {{ t('basicUsage') }}
      </van-button>
    </van-sticky>
  </demo-block> -->
</template>

<style lang="less">
.demo-sticky {
  height: 200vh;

  .van-button {
    margin-left: var(--van-padding-md);
  }
}
</style>
