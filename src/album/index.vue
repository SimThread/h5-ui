<template>
  <div class="h5-album">
    <NavBar
      :class="[showPreview ? 'preview' : 'default']"
      left-arrow
      fixed
      :border="false"
      @click-left="$emit('close')"
    >
      <template #title>
        <span>{{ index + 1 }}/{{ count(swiperList) }}</span>
      </template>
      <template v-if="showNavRight" #right>
        <span @click="onClickAllImg()">{{ navRightText }}</span>
      </template>
    </NavBar>

    <div v-show="showPreview" class="image-preview-wrap">
      <div class="imglist-type">
        <h5-scroll
          ref="scroll"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
        >
          <div class="scroll-content list-wrapper">
            <div class="scroll-item">
              <span
                v-for="(item, scrollIndex) in swiperList"
                :class="[
                  'type-item',
                  'list-item',
                  { active: parentIndex == scrollIndex },
                ]"
                @click="slideToParent(scrollIndex)"
                >{{ item.name
                }}{{ item.img.length > 1 ? `(${item.img.length})` : '' }}</span
              >
            </div>
          </div>
        </h5-scroll>
      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <template v-for="(imgType, pIndex) in swiperList">
            <template v-if="imgType.img">
              <div
                v-for="(img, cIndex) in imgType.img"
                :key="`${imgType.name}-${cIndex}`"
                class="swiper-slide"
                :data-parent-index="pIndex"
                :data-child-index="cIndex"
              >
                <template v-if="img.showType == 'video'">
                  <div class="video-container swiper-zoom-container">
                    <iframe
                      id="video-iframe"
                      class="video-iframe"
                      :src="img.link_url"
                      frameborder="0"
                      allow="autoplay"
                    />
                  </div>
                </template>
                <template v-else>
                  <div
                    :class="
                      img.type
                        ? 'swiper-item-container'
                        : 'swiper-item-container swiper-zoom-container'
                    "
                  >
                    <img
                      :data-src="img.src"
                      :alt="img.note"
                      class="swiper-lazy"
                      @click="onClickImg(img, pIndex, cIndex)"
                    />
                    <div
                      class="swiper-lazy-preloader swiper-lazy-preloader-white"
                    />
                    <slot :name="img.type"></slot>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <template v-if="!showPreview">
      <div class="img-list">
        <Tabs
          ref="tabs"
          v-model="active"
          scrollspy
          sticky
          color="#0c5ffe"
          title-active-color="#0c5ffe"
          line-width="30"
          line-height="2"
          offset-top="86"
        >
          <Tab
            v-for="(imgType, pIndex) in swiperList"
            :key="pIndex"
            :title="imgType.name"
          >
            <div class="img-block page-block">
              <h3 class="title">
                {{ imgType.name }}({{ imgType.img.length }})
              </h3>
              <div class="img-container">
                <div class="img-container-wrap">
                  <div v-for="(img, cIndex) in imgType.img" class="img-item">
                    <div
                      :class="['img-wrap', getTypeClass(img.type)]"
                      @click="onClickThumbnail(img, pIndex, cIndex)"
                    >
                      <img v-lazy="img.thumb" :alt="img.note" />
                      <slot :name="img.type"></slot>
                    </div>
                    <div class="img-text ellipsis">{{ img.note }}</div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </template>

    <slot name="default"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
// import Scroll from '../scroll';
import Swiper from 'swiper';
import { Tab, Tabs, NavBar } from 'vant';
import Lazy from '../utils/lazy';

const LazyClass = Lazy();
const lazy = new LazyClass({});

export default {
  name: 'H5Album',
  components: {
    Tab,
    Tabs,
    NavBar,
  },
  directives: {
    lazy: {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy),
    },
  },
  props: {
    typeIndex: {
      type: Number,
      default: 0,
    },
    posIndex: {
      type: Number,
      default: 0,
    },
    swiperList: {
      type: Array,
      default: () => [],
    },
    // 是否显示"全部"按钮
    showNavRight: {
      type: Boolean,
      default: true,
    },
    navRightText: {
      type: String,
      default: '全部圖像',
    },
  },
  emits: ['close', 'update:showPreview', 'clickVR'],
  setup() {
    console.log('setup');
  },
  data() {
    return {
      showPreview: true,
      index: 0,
      swiper: null,
      active: 0,
      parentIndex: this.typeIndex || 0,
      childIndex: this.posIndex || 0,
    };
  },
  watch: {
    showPreview: {
      handler(newVal) {
        console.log('showPreview');
        this.$emit('update:showPreview', newVal);
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
      this.slideToChild(this.parentIndex, this.childIndex);
      this.initVideoSet();
    });
  },
  methods: {
    initVideoSet() {
      const currentEle = this.swiperList[this.parentIndex].img[this.childIndex];
      if (currentEle && currentEle.type === 'video') {
        currentEle.showType = 'video';
      }
    },
    getPosByIndex(index) {
      const currentSlideEle = document.querySelectorAll(
        '.swiper-wrapper .swiper-slide'
      )[index];
      const { parentIndex, childIndex } = currentSlideEle.dataset;
      return {
        parentIndex,
        childIndex,
      };
    },
    initSwiper() {
      const self = this;
      self.swiper = new Swiper('.swiper-container', {
        // Enable lazy loading
        zoom: true,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChangeTransitionEnd() {
            self.index = this.activeIndex;
            const activePos = self.getPosByIndex(this.activeIndex);
            self.parentIndex = activePos.parentIndex;
            self.childIndex = activePos.childIndex;

            const previousPos = self.getPosByIndex(this.previousIndex);
            const previousEle =
              self.swiperList[previousPos.parentIndex].img[
                previousPos.childIndex
              ];
            if (previousEle.type === 'video') {
              previousEle.showType = 'image';
            }

            self.$nextTick(() => {
              self.$refs.scroll.scrollToElement('.type-item.active');
            });
          },
        },
      });
    },
    onClickAllImg() {
      this.showPreview = false;
    },
    getIndex(ele) {
      const parentEle = ele.parentNode;
      const nodes = Array.prototype.slice.call(parentEle.children);
      return nodes.indexOf(ele);
    },
    slideToParent(parentIndex) {
      const slideEle = document.querySelector(
        `[data-parent-index='${parentIndex}']`
      );
      this.swiper.slideTo(this.getIndex(slideEle), 0);

      this.parentIndex = parentIndex;
      this.childIndex = 0;
    },
    onClickThumbnail(item, parentIndex, childIndex) {
      if (item.type === 'vr') {
        this.$emit('clickVR', {
          linkUrl: item.link_url,
          note: item.note,
        });
        return;
      }

      this.showPreview = true;
      this.slideToChild(parentIndex, childIndex);
    },
    slideToChild(parentIndex, childIndex) {
      this.parentIndex = parentIndex;
      this.childIndex = childIndex;
      this.$nextTick(() => {
        const slideEle = document.querySelectorAll(
          `[data-parent-index='${parentIndex}']`
        )[childIndex];
        this.swiper.slideTo(this.getIndex(slideEle), 0, () => {
          this.swiper.lazy.load();
        });
      });
    },
    count(swiperList) {
      let i = 0;
      swiperList.forEach((item) => {
        item.img.forEach(() => {
          i++;
        });
      });
      return i;
    },
    getTypeClass(type) {
      if (type === 'vr') {
        return 'vr-logo';
      }
      if (type === 'video') {
        return 'video-logo';
      }
      return '';
    },
    onClickImg(item, pIndex, cIndex) {
      if (item.type === 'vr') {
        this.$emit('clickVR', {
          linkUrl: item.link_url,
          note: item.note,
        });
      } else if (item.type === 'video') {
        item.showType = item.showType === 'video' ? 'image' : 'video';
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style lang="scss">
@import './swiper.min.scss';
.h5-album {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  background: #1f1f1f;
  z-index: 999;
  overflow: scroll;
  .van-tabs {
    &.van-tabs--line .van-tabs__wrap {
      position: fixed;
      z-index: 9;
      top: 46px;
      width: 100%;
      line-height: 40px;
      background-color: #fff;
      overflow: hidden;
      box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.03);
    }
    .van-tabs__nav {
      padding-left: 15px;
      margin-left: -22px;
      .van-tab {
        flex: none;
        flex-basis: auto !important;
        padding: 0 22px;
      }
    }
    .h5-hairline--top-bottom::after,
    .h5-hairline-unset--top-bottom::after {
      display: none;
    }
    .van-tab--active {
      color: #0c5ffe;
    }
  }
  .van-nav-bar {
    .van-nav-bar__title {
      color: inherit;
    }
    &.preview {
      background: #1f1f1f;
      color: #fff;
      .van-icon-arrow-left {
        color: #fff;
      }
    }
    &.default {
      background: #fff;
      color: #333;
      .van-icon-arrow-left {
        color: #333;
      }
    }
  }
  .image-preview-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // z-index: 9999;
    .nav {
      height: 0;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .h5-nav-bar__title {
        color: inherit;
      }
    }
    .imglist-type {
      position: relative;
      z-index: 2;
      top: 32px;
      padding: 15px 15px 0;
      .type-item {
        height: 25px;
        line-height: 25px;
        text-align: center;
        padding: 0 10px;
        border-radius: 12px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        &.active {
          background: #474747;
        }
      }
    }
    .swiper-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      .swiper-lazy-loaded + .img-logo {
        display: block;
      }
      .img-logo {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        pointer-events: none;
        background-size: cover;
        &.vr-logo {
          svg {
            display: block;
          }
        }
        &.video-logo {
          // background: url("./images/icon_video.png");
        }
        svg {
          display: none;
        }
      }
      .swiper-item-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        img {
          width: 100%;
        }
      }
      .video-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .video-iframe {
          width: 100%;
        }
      }
    }
  }
  .img-list {
    &.distance {
      padding-bottom: 55px;
    }

    min-height: 100vh;
    background: #fff;
    padding: 120px 0 55px;
    .van-tab__pane:nth-child(n + 2) {
      margin-top: 25px;
    }
    .img-block {
      padding: 5px 15px 0;
      .title {
        font-size: 14px;
        line-height: 1.2em;
      }
      .img-container {
        overflow: hidden;
        width: 345px;
        padding-top: 8.5px;
        .img-container-wrap {
          margin-top: -8.5px;
          margin-left: -8.5px;
          width: 355px;
          display: flex;
          flex-wrap: wrap;
        }
        .img-item {
          margin-top: 8.5px;
          margin-left: 8.5px;
          width: 80px;
          img {
            width: 100%;
          }
          .img-wrap {
            position: relative;
            width: 80px;
            height: 60px;
            overflow: hidden;
            .album-logo {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              width: 30px;
              height: 30px;
            }
          }
          .img-text {
            font-size: 12px;
            color: #808080;
            text-align: center;
          }
        }
      }
    }
  }
  .horizontal-scroll-list-wrap {
    .h5-scroll__content {
      display: inline-block;
    }
    .list-wrapper {
      white-space: nowrap;
    }
    .list-item {
      display: inline-block;
    }
  }
  .album-logo {
    pointer-events: none;
  }
}
</style>
