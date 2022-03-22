<script setup lang="ts">
import VanTabs from '../../business-filter-area';
import VanTab from '..';
// import VanIcon from '../../icon';
import { ref } from 'vue';
// import { Toast } from '../../toast';

const active = ref(2);
const activeName = ref('b');

const tabs = [1, 2, 3, 4];

// const onClickTab = ({ title }: { title: string }) => {
//   Toast(title);
// };

const beforeChange = (name: number) => {
  if (name === 1) {
    return false;
  }
  return new Promise((resolve) => {
    resolve(name !== 3);
  });
};
</script>

<template>
  <van-tabs v-model:active="active">
    <van-tab :title="'tab' + index" v-for="index in tabs" :key="index">
      内容 {{ index }}
    </van-tab>
  </van-tabs>
</template>

<style lang="less">
.demo-tab {
  margin-bottom: 80vh;

  .van-tab .van-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .van-tab__pane {
    padding: 24px 20px;
    background-color: var(--van-white);
  }

  .van-tabs--card .van-tab__pane {
    background-color: transparent;
  }
}
</style>
