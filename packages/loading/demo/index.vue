<template>
  <demo-section>
    <demo-block title="Circular">
      <h5-loading />
      <h5-loading color="white" />
    </demo-block>

    <demo-block title="Spinner">
      <h5-loading type="spinner" />
      <h5-loading
        type="spinner"
        color="white"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
    i18n: {
        'zh-CN': {
            title1: 'Circular',
            title2: 'Spinner'
        },
        'en-US': {
            title1: 'Circular',
            title2: 'Spinner'
        }
    }
};
</script>

<style lang="less">
.demo-loading {
  .h5-loading {
    display: inline-block;
    margin: 5px 0 5px 20px;
  }

  .h5-loading--white {
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
  }
}
</style>
