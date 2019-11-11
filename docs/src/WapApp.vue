<template>
  <div>
    <h5-nav-bar
      v-show="title && showNav"
      class="h5-doc-nav-bar"
      :title="title"
      left-arrow
      @click-left="onBack"
    >
      <a
        slot="right"
        :href="demoLink"
        target="_blank"
      >
        <h5-icon name="edit" />
      </a>
    </h5-nav-bar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
function getQueryString(name) {
  const arr = location.search.substr(1).split('&');
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i].split('=');
    if (item.shift() === name) {
      return decodeURIComponent(item.join('='));
    }
  }
  return '';
}

export default {
  computed: {
    title() {
      const { name } = this.$route.meta;
      return name ? name.replace(/-/g, '') : '';
    },

    demoLink() {
      return `https://github.com/youzan/vant/blob/dev/packages/${
        this.$route.meta.path
      }/demo/index.vue`;
    },

    showNav() {
      return getQueryString('hide_nav') !== '1';
    }
  },

  methods: {
    onBack() {
      history.back();
    }
  }
};
</script>

<style lang="less">
@import '../../packages/style/var';

body {
  min-width: auto;
  line-height: 1;
  color: @text-color;
  background-color: #fafafa;
  font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2.5px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 2.5px rgba(0, 0, 0, 0.3);
    border-radius: 2.5px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 2.5px rgba(0, 0, 0, .3);
    box-shadow: inset 0 0 2.5px rgba(0, 0, 0, .3);
    border-radius: 2.5px;
    // background-color: #294E80;
    background: #e5e5e5;
    opacity: .7;
    transition: opacity ease-in-out 200ms;
}

::-webkit-scrollbar-thumb:hover {
    opacity: 1;
}

.h5-doc-nav-bar {
  .h5-nav-bar__title {
    font-size: 15px;
    text-transform: capitalize;
  }

  .h5-nav-bar__left,
  .h5-nav-bar__right {
    cursor: pointer;
  }

  .h5-nav-bar__right {
    display: none;
    font-size: 16px;

    .h5-icon {
      vertical-align: -3px;
    }
  }
}

.h5-doc-demo-section {
  margin-top: -46px;
  padding-top: 46px;
}
</style>
