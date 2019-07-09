<template>
  <div class="h5-doc">
    <h5-doc-header
      :config="config.header"
      :active="active"
    />
    <h5-doc-nav
      :nav-config="config.nav"
      :base="base"
    />
    <h5-doc-container :has-simulator="!!(simulator || simulators.length)">
      <h5-doc-content>
        <slot />
      </h5-doc-content>
    </h5-doc-container>
    <h5-doc-simulator
      v-if="simulator"
      :src="simulator"
    />
    <template v-if="config.showSimulator">
      <h5-doc-simulator
        v-for="(url, index) in simulators"
        v-show="index === currentSimulator"
        :src="url"
        :key="url"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'h5-doc',

  props: {
    active: String,
    config: {
      type: Object,
      required: true
    },
    currentSimulator: Number,
    simulator: String,
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },

  watch: {
    '$route.path': function () {
      this.setNav();
      this.updateNav();
    }
  },

  created() {
    this.setNav();
    this.updateNav();
    this.keyboardHandler();
  },

  methods: {
    setNav() {
      const { nav } = this.config;
      for (let i = 0; i < nav.length; i++) {
        const navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (let j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },

    updateNav() {
      let currentIndex;
      this.currentPath = '/' + this.$route.path.split('/').pop();
      for (let i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },

    handleNavClick(direction) {
      const nav = direction === 'prev' ? this.leftNav : this.rightNav;
      if (nav.path) {
        this.$router.push(this.base + nav.path);
      } else if (nav.link) {
        window.location.href = nav.link;
      }
    },

    keyboardHandler() {
      window.addEventListener('keyup', event => {
        switch (event.keyCode) {
          case 37: // left
            this.handleNavClick('prev');
            break;
          case 39: // right
            this.handleNavClick('next');
            break;
        }
      });
    }
  }
};
</script>

<style>
@import './style/index.css';
</style>
