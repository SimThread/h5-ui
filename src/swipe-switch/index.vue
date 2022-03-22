<template>
  <div v-show="isShow()" class="swiper-switch">
    <template v-for="type in types">
      <span
        :class="['switch-item', { active: currentType == type.name }]"
        @click="onChange(type.name)"
      >
        {{ type.text }}
      </span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'H5SwipeSwitch',
  props: {
    value: {
      type: String,
      default: '',
    },
    types: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input', 'change'],
  data() {
    return {
      currentType: this.value || this.types[0].name,
    };
  },
  watch: {
    value(newVal) {
      this.currentType = newVal;
    },
  },
  methods: {
    onChange(type) {
      this.currentType = type;
      this.$emit('input', type);
      this.$emit('change', type);
    },
    isShow() {
      if (this.types.length === 1 && this.types[0].name === 'image') {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.swiper-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  .switch-item {
    background: #fff;
    color: #000;
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    &.active {
      background: #0c5ffe;
      color: #fff;
    }
  }
}
</style>
