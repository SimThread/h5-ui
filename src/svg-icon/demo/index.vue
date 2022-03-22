<template>
  <demo-section>
    <demo-block title="基本用法">
      <div style="padding: 0 10px">
        <h5-svg-icon name="share" color="#000000" />

        <h5-svg-icon name="anjie" color="#000000" />

        <h5-svg-icon name="back" color="#000000" />

        <h5-svg-icon name="browse-ico" color="#000000" />

        <h5-svg-icon name="cart-full" color="#000000" />

        <h5-svg-icon name="chachengjiao" color="#000000" />

        <h5-svg-icon name="dawanqu" color="#000000" />

        <h5-svg-icon name="dichanxinwen" color="#000000" />
      </div>
    </demo-block>
  </demo-section>
</template>

<script>
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context('../../../public/svg', false, /\.svg$/);
console.log('req:', req);
requireAll(req);

export default {
  data() {
    return {};
  },

  created() {},
  methods: {
    animCreated() {},
  },
};
</script>

<style lang="less">
.h5-svg-icon {
  width: 30px;
  height: 30px;
  margin: 5px;
}
</style>
