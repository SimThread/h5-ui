<template>
  <div ref="wrapper" class="h5-scroll__wrapper">
    <div class="h5-scroll__content">
      <div ref="listWrapper" class="h5-scroll__list-wrapper">
        <slot>
          <ul class="h5-scroll-list">
            <li
              class="h5-scroll__item border-bottom-1px"
              v-for="(item, index) in data"
              :key="index"
              @click="clickItem(item)"
            >
              {{ item }}
            </li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="h5-pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <!-- <loading></loading> -->
          </div>
        </div>
      </slot>
    </div>
    <div v-if="pullDownRefresh" class="h5-pulldown" ref="pulldown">
      <slot
        name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownStyle="pullDownStyle"
        :beforePullDown="beforePullDown"
        :isPullingDown="isPullingDown"
        :bubbleY="bubbleY"
      >
        <div class="h5-pulldown-wrapper" :style="pullDownStyle">
          <div class="before-trigger" v-show="beforePullDown">
            <!-- <bubble :y="bubbleY" class="bubble"></bubble> -->
          </div>
          <div class="after-trigger" v-show="!beforePullDown">
            <div v-show="isPullingDown" class="loading">
              <!-- <loading></loading> -->
            </div>
            <div v-show="!isPullingDown" class="h5-pulldown-loaded">
              <span>{{ refreshTxt }}</span>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-underscore-dangle */
import BScroll from 'better-scroll';

const scrollMixin = {
  props: {
    // the options of BetterScroll
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};

const deprecatedMixin = {
  methods: {
    _checkDeprecated() {
      const { props } = this.$options;

      Object.entries(props).forEach(([key, prop]) => {
        const { deprecated } = prop;

        if (deprecated && this[key] !== undefined) {
          // tip(`The property "${kebab(key)}" is deprecated, please use the recommended property "${deprecated.replacedBy}" to replace it. Details could be found in https://didi.github.io/h5-ui/#/en-US/docs/${componentName.substr(5)}#h5-Propsconfiguration-anchor`, componentName);
        }
      });
    },
  },
  mounted() {
    this._checkDeprecated();
  },
};

function getRect(el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

const camelizeRE = /-(\w)/g;
function camelize(str) {
  str = String(str);
  return str.replace(camelizeRE, (m, c) => (c ? c.toUpperCase() : ''));
}

const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';
const DEFAULT_REFRESH_TXT = 'Refresh success';
const DEFAULT_STOP_TIME = 600;

const EVENT_CLICK = 'click';
const EVENT_PULLING_DOWN = 'pulling-down';
const EVENT_PULLING_UP = 'pulling-up';

const EVENT_SCROLL = 'scroll';
const EVENT_BEFORE_SCROLL_START = 'before-scroll-start';
const EVENT_SCROLL_END = 'scroll-end';

const NEST_MODE_NONE = 'none';
const NEST_MODE_NATIVE = 'native';

const SCROLL_EVENTS = [
  EVENT_SCROLL,
  EVENT_BEFORE_SCROLL_START,
  EVENT_SCROLL_END,
];

const DEFAULT_OPTIONS = {
  observeDOM: true,
  click: true,
  probeType: 1,
  scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false,
};

export default {
  name: 'H5Scroll',
  mixins: [scrollMixin, deprecatedMixin],
  provide() {
    return {
      parentScroll: this,
    };
  },
  inject: {
    parentScroll: {
      default: null,
    },
  },
  props: {
    data: {
      type: Array,
      default() {
        // return [];
        return [];
      },
    },
    scrollEvents: {
      type: Array,
      default() {
        return [];
      },
      validator(arr) {
        return arr.every((item) => SCROLL_EVENTS.indexOf(item) !== -1);
      },
    },
    // TODO: plan to remove at 1.10.0
    listenScroll: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'scroll-events',
      },
    },
    listenBeforeScroll: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'scroll-events',
      },
    },
    direction: {
      type: String,
      default: DIRECTION_V,
    },
    refreshDelay: {
      type: Number,
      default: 20,
    },
    nestMode: {
      type: String,
      default: NEST_MODE_NONE,
    },
  },
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpNoMore: false,
      bubbleY: 0,
      pullDownStyle: '',
      pullDownStop: 40,
      pullDownHeight: 60,
      pullUpHeight: 0,
    };
  },
  computed: {
    pullDownRefresh() {
      let { pullDownRefresh } = this.options;
      if (!pullDownRefresh) {
        return pullDownRefresh;
      }
      if (pullDownRefresh === true) {
        pullDownRefresh = {};
      }
      return { stop: this.pullDownStop, ...pullDownRefresh };
    },
    pullUpLoad() {
      return this.options.pullUpLoad;
    },
    pullUpTxt() {
      const { pullUpLoad } = this;
      const txt = pullUpLoad && pullUpLoad.txt;
      const moreTxt = (txt && txt.more) || '';
      const noMoreTxt = (txt && txt.noMore) || '';

      return this.pullUpNoMore ? noMoreTxt : moreTxt;
    },
    refreshTxt() {
      const { pullDownRefresh } = this;
      return (pullDownRefresh && pullDownRefresh.txt) || DEFAULT_REFRESH_TXT;
    },
    finalScrollEvents() {
      const finalScrollEvents = this.scrollEvents.slice();

      if (!finalScrollEvents.length) {
        this.listenScroll && finalScrollEvents.push(EVENT_SCROLL);
        this.listenBeforeScroll &&
          finalScrollEvents.push(EVENT_BEFORE_SCROLL_START);
      }
      return finalScrollEvents;
    },
    needListenScroll() {
      return (
        this.finalScrollEvents.indexOf(EVENT_SCROLL) !== -1 || this.parentScroll
      );
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    },
    pullDownRefresh: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.scroll.openPullDown(newVal);
          if (!oldVal) {
            this._onPullDownRefresh();
            this._pullDownRefreshChangeHandler();
          }
        }

        if (!newVal && oldVal) {
          this.scroll.closePullDown();
          this._offPullDownRefresh();
          this._pullDownRefreshChangeHandler();
        }
      },
      deep: true,
    },
    pullUpLoad: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.scroll.openPullUp(newVal);
          if (!oldVal) {
            this._onPullUpLoad();
            this._pullUpLoadChangeHandler();
          }
        }

        if (!newVal && oldVal) {
          this.scroll.closePullUp();
          this._offPullUpLoad();
          this._pullUpLoadChangeHandler();
        }
      },
      deep: true,
    },
  },
  activated() {
    /* istanbul ignore next */
    this.enable();
  },
  deactivated() {
    /* istanbul ignore next */
    this.disable();
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  beforeUnmounted() {
    this.destroy();
  },
  methods: {
    initScroll() {
      console.log('initScroll:', this.$refs.wrapper);
      if (!this.$refs.wrapper) {
        return;
      }
      this._calculateMinHeight();

      const options = {
        ...DEFAULT_OPTIONS,
        scrollY: this.direction === DIRECTION_V,
        scrollX: this.direction === DIRECTION_H,
        probeType: this.needListenScroll ? 3 : 1,
        ...this.options,
      };

      this.scroll = new BScroll(this.$refs.wrapper, options);

      this.parentScroll &&
        this.nestMode !== NEST_MODE_NONE &&
        this._handleNestScroll();

      this._listenScrollEvents();

      if (this.pullDownRefresh) {
        this._onPullDownRefresh();
        this._pullDownRefreshChangeHandler();
      }

      if (this.pullUpLoad) {
        this._onPullUpLoad();
        this._pullUpLoadChangeHandler();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this._calculateMinHeight();
      this.scroll && this.scroll.refresh();
    },
    destroy() {
      this.scroll && this.scroll.destroy();
      this.scroll = null;
    },
    scrollTo(...args) {
      this.scroll && this.scroll.scrollTo.call(this.scroll, ...args);
    },
    scrollToElement(...args) {
      this.scroll && this.scroll.scrollToElement.call(this.scroll, args);
    },
    clickItem(item) {
      this.$emit(EVENT_CLICK, item);
    },
    forceUpdate(dirty = false, nomore = false) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown(() => {
          this._afterPullDown(dirty);
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpNoMore = !dirty || nomore;
        dirty && this.refresh();
      } else {
        dirty && this.refresh();
      }
    },
    resetPullUpTxt() {
      this.pullUpNoMore = false;
    },
    _listenScrollEvents() {
      this.finalScrollEvents.forEach((event) => {
        this.scroll.on(camelize(event), (...args) => {
          console.log('scroll on');
          this.$emit(event, ...args);
        });
      });
    },
    _handleNestScroll() {
      // waiting scroll initial
      this.$nextTick(() => {
        const innerScroll = this.scroll;
        const outerScroll = this.parentScroll.scroll;
        const scrolls = [innerScroll, outerScroll];
        scrolls.forEach((scroll, index, arr) => {
          // scroll ended always enable them
          scroll.on('touchEnd', () => {
            outerScroll.enable();
            innerScroll.enable();
            // when inner scroll reaching boundary, we will disable inner scroll, so when 'touchend' event fire,
            // the inner scroll will not reset initiated within '_end' method in better-scroll.
            // then lead to inner and outer scrolls together when we touch and move on the outer scroll element,
            // so here we reset inner scroll's 'initiated' manually.
            innerScroll.initiated = false;
          });

          scroll.on('beforeScrollStart', () => {
            this.touchStartMoment = true;
            const anotherScroll = arr[(index + 1) % 2];
            anotherScroll.stop();
            anotherScroll.resetPosition();
          });
        });

        innerScroll.on('scroll', (pos) => {
          // if scroll event triggered not by touch event, such as by 'scrollTo' method
          if (!innerScroll.initiated || innerScroll.isInTransition) {
            return;
          }

          if (this.nestMode === NEST_MODE_NATIVE && !this.touchStartMoment) {
            return;
          }

          const reachBoundary = this._checkReachBoundary(pos);
          if (reachBoundary) {
            innerScroll.resetPosition();
            innerScroll.disable();
            // Prevent outer scroll have a bouncing step when enabled in 'free' nestMode.
            outerScroll.pointX = innerScroll.pointX;
            outerScroll.pointY = innerScroll.pointY;
            outerScroll.enable();
          } else {
            outerScroll.disable();
          }
          this.touchStartMoment = false;
        });
      });
    },
    _checkReachBoundary(pos) {
      const { distX } = this.scroll;
      const { distY } = this.scroll;
      const reachBoundaryX =
        distX > 0
          ? pos.x >= this.scroll.minScrollX
          : distX < 0
          ? pos.x <= this.scroll.maxScrollX
          : false;
      const reachBoundaryY =
        distY > 0
          ? pos.y >= this.scroll.minScrollY
          : distY < 0
          ? pos.y <= this.scroll.maxScrollY
          : false;
      const { freeScroll } = this.scroll;
      const { hasHorizontalScroll } = this.scroll;
      const { hasVerticalScroll } = this.scroll;

      if (!hasHorizontalScroll && !hasVerticalScroll) {
        return true;
      }

      if (freeScroll) {
        return reachBoundaryX || reachBoundaryY;
      }

      let reachBoundary;
      if (this.scroll.movingDirectionX) {
        reachBoundary = reachBoundaryX;
      } else if (this.scroll.movingDirectionY) {
        reachBoundary = reachBoundaryY;
      }
      return reachBoundary;
    },
    _calculateMinHeight() {
      const { wrapper, listWrapper } = this.$refs;
      const { pullUpLoad } = this;
      const { pullDownRefresh } = this;
      let minHeight = 0;

      if (pullDownRefresh || pullUpLoad) {
        const wrapperHeight = getRect(wrapper).height;
        minHeight = wrapperHeight + 1;
        if (pullUpLoad && pullUpLoad.visible) {
          // minHeight = wrapperHeight + 1 - pullUpHeight, then pullUpLoad text is visible
          // when content's height is not larger than wrapper height
          minHeight -= this.pullUpHeight;
        }
      }

      listWrapper.style.minHeight = `${minHeight}px`;
    },
    _onPullDownRefresh() {
      this.scroll.on('pullingDown', this._pullDownHandle);
      this.scroll.on('scroll', this._pullDownScrollHandle);
    },
    _offPullDownRefresh() {
      this.scroll.off('pullingDown', this._pullDownHandle);
      this.scroll.off('scroll', this._pullDownScrollHandle);
    },
    _pullDownRefreshChangeHandler() {
      this.$nextTick(() => {
        this._getPullDownEleHeight();
        this._calculateMinHeight();
      });
    },
    _pullDownHandle() {
      if (this.resetPullDownTimer) {
        clearTimeout(this.resetPullDownTimer);
      }
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit(EVENT_PULLING_DOWN);
    },
    _pullDownScrollHandle(pos) {
      if (this.beforePullDown) {
        this.bubbleY = Math.max(0, pos.y - this.pullDownHeight);
        this.pullDownStyle = `top:${Math.min(
          pos.y - this.pullDownHeight,
          0
        )}px`;
      } else {
        this.bubbleY = 0;
        this.pullDownStyle = `top:${Math.min(pos.y - this.pullDownStop, 0)}px`;
      }
    },
    _pullUpLoadChangeHandler() {
      this.$nextTick(() => {
        this._getPullUpEleHeight();
        this._calculateMinHeight();
      });
    },
    _onPullUpLoad() {
      this.scroll.on('pullingUp', this._pullUpHandle);
    },
    _offPullUpLoad() {
      this.scroll.off('pullingUp', this._pullUpHandle);
    },
    _pullUpHandle() {
      this.isPullUpLoad = true;
      this.$emit(EVENT_PULLING_UP);
    },
    _reboundPullDown(next) {
      const { stopTime = DEFAULT_STOP_TIME } = this.pullDownRefresh;
      setTimeout(() => {
        this.scroll.finishPullDown();
        next();
      }, stopTime);
    },
    _afterPullDown(dirty) {
      this.resetPullDownTimer = setTimeout(() => {
        this.pullDownStyle = `top: -${this.pullDownHeight}px`;
        this.beforePullDown = true;
        dirty && this.refresh();
      }, this.scroll.options.bounceTime);
    },
    _getPullDownEleHeight() {
      let { pulldown } = this.$refs;
      if (!pulldown) {
        return;
      }
      pulldown = pulldown.firstChild;
      this.pullDownHeight = getRect(pulldown).height;

      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$nextTick(() => {
        this.pullDownStop = getRect(pulldown).height;

        this.beforePullDown = true;
        this.isPullingDown = false;
      });
    },
    _getPullUpEleHeight() {
      const { listWrapper } = this.$refs;
      const pullup = listWrapper.nextElementSibling;
      if (!pullup) {
        this.pullUpHeight = 0;
        return;
      }
      this.pullUpHeight = getRect(pullup).height;
    },
  },
};
</script>

<style lang="scss">
.h5-scroll {
  &__wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  &__list-wrapper {
    overflow: hidden;
  }

  &__pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .before-trigger {
      height: 54px;
      line-height: 0;
      padding-top: 6px;
    }
    .after-trigger {
      .loading {
        padding: 8px 0;
      }
      .h5-pulldown-loaded {
        padding: 12px 0;
      }
    }
  }

  &__pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .before-trigger {
      padding: 22px 0;
      min-height: 1em;
    }
    .after-trigger {
      padding: 19px 0;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__item {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    padding-left: 20px;
  }
}
</style>
