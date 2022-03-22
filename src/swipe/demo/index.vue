<script setup lang="ts">
import VanSwipe from '..';
import VanSwipeItem from '../../swipe-item';
// import { Toast } from '../../toast';

// const onChange = (index: number) => Toast(t('message') + index);
</script>

<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>

<style lang="less">
.demo-swipe {
  padding-bottom: 30px;

  .van-swipe {
    &-item {
      color: var(--van-white);
      font-size: 20px;
      line-height: 150px;
      text-align: center;

      &:nth-child(even) {
        background-color: #39a9ed;
      }

      &:nth-child(odd) {
        background-color: #66c6f2;
      }
    }

    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: var(--van-white);
      pointer-events: none;
    }
  }

  &--vertical {
    .van-swipe-item {
      line-height: 200px;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    color: var(--van-white);
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
