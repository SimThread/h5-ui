<template>
  <div class="app">
    <h5-doc
      :base="base"
      :config="config"
      :active="activeVal"
      :simulators="simulators"
      :current-simulator="currentSimulator"
    >
      <router-view @changeDemoURL="onChangeDemoURL" />
    </h5-doc>
  </div>
</template>

<script>
import docConfig from './doc.config';

export default {
  data() {
    return {
      simulators: [`mobile.html${location.hash}`],
      demoURL: '',
      activeVal: 'components'
    };
  },

  computed: {
    base() {
      return `/${this.$h5Lang}`;
    },

    config() {
      return docConfig[this.$h5Lang];
    },

    currentSimulator() {
      const { name } = this.$route;
      return name && name.indexOf('demo') !== -1 ? 1 : 0;
    }
  },

  watch: {
    $route(to, from) {
      const { nav } = docConfig[this.$h5Lang].header;
      Object.keys(nav).forEach((navItem) => {
        if (nav[navItem].indexOf(location.hash.split('/')[1]) !== -1) {
          this.activeVal = navItem;
        }
      });
    },
  },

  methods: {
    onChangeDemoURL(url) {
      this.simulators = [this.simulators[0], url];
    }
  }
};
</script>

<style lang="less">
.h5-doc-intro {
  padding-top: 40px;
  text-align: center;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;

  &__youzan {
    width: 32px;
    height: 32px;
    display: block;
    margin: 25px 0 0;
  }

  &__logo {
    // width: 120px;
    // height: 120px;
  }

  h2 {
    font-size: 36px;
    line-height: 60px;
    font-weight: normal;
  }

  p {
    font-size: 15px;
    color: #455a64;
  }
}
</style>
