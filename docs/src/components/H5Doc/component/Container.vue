<template>
  <div
    class="h5-doc-container h5-doc-row"
    :class="{ 'h5-doc-container--with-simulator': hasSimulator }"
  >
    <slot />
  </div>
</template>

<script>
export default {
    name: 'h5-doc-container',

    props: {
        hasSimulator: Boolean
    }
};
</script>

<style>
@import '../style/variable';

.h5-doc-container {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  padding-left: $h5-doc-nav-width;

  &--with-simulator {
    padding-right: calc($h5-doc-simulator-width + $h5-doc-padding);

    @media (max-width: 1300px) {
      padding-right: calc($h5-doc-simulator-small-width + $h5-doc-padding);
    }
  }
}
</style>
