<template>
  <button class="h5-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'H5Button',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss">
.h5-button {
  position: relative;
  display: inline-block;
  height: 44px;
  line-height: 42px;
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  color: #323233;
  background-color: #fff;
  border: 1px solid #ebedf0;
  padding: 0 15px;
  font-size: 14px;
}
</style>
