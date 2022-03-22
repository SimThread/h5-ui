<template>
  <div class="demo-scroll">
    <div class="scroll-list-wrap">
      <h5-scroll ref="scroll" :data="baseItems" :options="options" />
    </div>

    <h5-scroll
      ref="scroll"
      :data="horizontalItems"
      direction="horizontal"
      class="horizontal-scroll-list-wrap"
    >
      <ul class="list-wrapper">
        <li v-for="item in horizontalItems" class="list-item">{{ item }}</li>
      </ul>
    </h5-scroll>
  </div>
</template>

<script>
const baseData = [
  '😀 😁 😂 🤣 😃 😄😀 😁 😂 🤣 😃 😄 ',
  '🙂 🤗 🤩 🤔 🤨 😐🙂 🤗 🤩 🤔 🤨 😐 ',
  '👆🏻 scroll up/down 👇🏻👆🏻 scroll up/down 👇🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ 😔 😕 🙃 🤑 😲 ☹️',
  '🐣 🐣 🐣 🐣 🐣 🐣 🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👆🏻 scroll up/down 👇🏻👆🏻 scroll up/down 👇🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 🐥 🐥 🐥 🐥 🐥 🐥',
  '🤓 🤓 🤓 🤓 🤓 🤓 🤓 🤓 🤓 🤓 🤓 🤓',
  '👆🏻 scroll up/down 👇🏻 👆🏻 scroll up/down 👇🏻 ',
  '🦔 🦔 🦔 🦔 🦔 🦔 🦔 🦔 🦔 🦔 🦔 🦔',
  '🙈 🙈 🙈 🙈 🙈 🙈🙈 🙈 🙈 🙈 🙈 🙈 ',
  '👆🏻 scroll up/down 👇🏻 👆🏻 scroll up/down 👇🏻 ',
  '🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖 ',
  '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻  ',
];
const horizontalData = [
  '😀 😁 😂 🤣 😃 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '🙂 🤔 😄 🤨 😐 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ ',
  '👈🏻  scroll 👉🏻 ',
  '🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👈🏻  scroll 👉🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 ',
  '👈🏻  scroll 👉🏻 ',
  '🤓 🤓 🤓 🤓 🤓 🤓 ',
  '👈🏻  scroll 👉🏻 ',
  '🦔 🦔 🦔 🦔 🦔 🦔 ',
  '👈🏻  scroll 👉🏻 ',
  '🙈 🙈 🙈 🙈 🙈 🙈 ',
  '👈🏻  scroll 👉🏻 ',
  '🚖 🚖 🚖 🚖 🚖 🚖 ',
  '👈🏻  scroll 👉🏻 ',
  '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ',
];

export const ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn(t) {
      return 1 + --t * t * t * t * t;
    },
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn(t) {
      return t * (2 - t);
    },
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn(t) {
      return 1 - --t * t * t * t;
    },
  },
};

export default {
  data() {
    return {
      baseItems: baseData,
      horizontalItems: horizontalData,
      scrollbar: true,
      scrollbarFade: true,
      startY: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: [
        {
          text: 'bounce',
          value: 'bounce',
        },
        {
          text: 'swipe',
          value: 'swipe',
        },
        {
          text: 'swipeBounce',
          value: 'swipeBounce',
        },
      ],
      customPullDown: false,
    };
  },
  computed: {
    options() {
      return {
        scrollbar: this.scrollbarObj,
        startY: this.startY,
      };
    },
    scrollbarObj() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false;
    },
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll();
      },
      deep: true,
    },
    startY() {
      this.rebuildScroll();
    },
  },
  methods: {
    scrollTo() {
      this.$refs.scroll.scrollTo(
        0,
        this.scrollToY,
        this.scrollToTime,
        ease[this.scrollToEasing]
      );
    },
    updateScrollbar(val) {
      this.scrollbar = val;
    },
    updateScrollbarFade(val) {
      this.scrollbarFade = val;
    },
    updateStartY(val) {
      this.startY = val;
    },
    updateScrollToY(val) {
      this.scrollToY = val;
    },
    updateScrollToTime(val) {
      this.scrollToTime = val;
    },
    updateScrollToEasing(val) {
      this.scrollToEasing = val;
    },
    rebuildScroll() {
      this.nextTick(() => {
        this.$refs.scroll.destroy();
        this.$refs.scroll.initScroll();
      });
    },
  },
};
</script>

<style lang="scss">
.demo-scroll {
  padding: 5px;
  .h5-doc-demo-block {
    padding: 0 15px;
  }
  .scroll-list-wrap {
    height: 350px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
  }
  .horizontal-scroll-list-wrap {
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .h5-scroll__content {
      display: inline-block;
    }
    .list-wrapper {
      padding: 0 10px;
      line-height: 60px;
      white-space: nowrap;
    }
    .list-item {
      display: inline-block;
    }
  }
}
</style>
