<template>
  <demo-section>
    <demo-block title="按钮类型">
      <div class="demo-button-row">
        <h5-button type="primary">主要按钮</h5-button>
        <h5-button type="danger">危险按钮</h5-button>
      </div>
      <h5-button type="default">默认按钮</h5-button>
      <h5-button type="warning">警告按钮</h5-button>
    </demo-block>

    <demo-block title="朴素按钮">
      <h5-button
        plain
        type="primary"
        text="朴素按钮"
      />
      <h5-button
        plain
        type="danger"
        text="朴素按钮"
      />
    </demo-block>

    <demo-block title="禁用按钮">
      <h5-button
        disabled
        type="primary"
        text="禁用按钮"
      />
      <h5-button
        disabled
        type="danger"
        text="禁用按钮"
      />
    </demo-block>

    <demo-block title="加载状态">
      <h5-button
        loading
        type="primary"
      />
      <h5-button
        loading
        loading-text="加载文本"
        type="danger"
      />
    </demo-block>

    <demo-block title="按钮形状">
      <h5-button
        type="primary"
        square
        text="方形按钮"
      />
      <h5-button
        type="danger"
        round
        text="圆形按钮"
      />
    </demo-block>

    <demo-block title="按钮尺寸">
      <h5-button size="large">大号按钮</h5-button>
      <h5-button size="normal">普通按钮</h5-button>
      <h5-button size="small">小型按钮</h5-button>
      <h5-button size="mini">迷你按钮</h5-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
};
</script>

<style lang="less">
.demo-button {
  .h5-button {
    user-select: none;

    &--large {
      margin-bottom: 15px;
    }

    &--small,
    &--normal:not(:last-child) {
      margin-right: 10px;
    }
  }

  .h5-doc-demo-block {
    padding: 0 15px;
  }

  .h5-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 10px;
  }
}
</style>
