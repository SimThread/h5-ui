import {
    createNamespace
} from '../_utils';
import NavBar from '../nav-bar';
import Scroll from '../scroll';
import Tabs from '../tabs';
import Tab from '../tab';
import Swiper from 'swiper';

const [createComponent, bem] = createNamespace('album');

export default createComponent({
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
            default: () => []
        },
        // 是否显示"全部"按钮
        showNavRight: {
            type: Boolean,
            default: true
        },
        navRightText: {
            type: String,
            default: '全部圖像'
        }
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
            handler(newVal, oldVal) {
                this.$emit('update:showPreview', newVal);
            },
            immediate: true
        }
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
            const currentSlideEle = document.querySelectorAll('.swiper-wrapper .swiper-slide')[index];
            const { parentIndex, childIndex } = currentSlideEle.dataset;
            return {
                parentIndex,
                childIndex
            };
        },
        initSwiper() {
            const self = this;
            self.swiper = new Swiper('.swiper-container', {
                // Enable lazy loading
                zoom: true,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 2
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    slideChangeTransitionEnd() {
                        self.index = this.activeIndex;
                        const activePos = self.getPosByIndex(this.activeIndex);
                        self.parentIndex = activePos.parentIndex;
                        self.childIndex = activePos.childIndex;

                        const previousPos = self.getPosByIndex(this.previousIndex);
                        const previousEle = self.swiperList[previousPos.parentIndex].img[previousPos.childIndex];
                        if (previousEle.type === 'video') {
                            previousEle.showType = 'image';
                        }

                        self.$nextTick(() => {
                            self.$refs.scroll.scrollToElement('.type-item.active');
                        });
                    }
                }
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
            const slideEle = document.querySelector(`[data-parent-index='${parentIndex}']`);
            this.swiper.slideTo(this.getIndex(slideEle), 0);

            this.parentIndex = parentIndex;
            this.childIndex = 0;
        },
        onClickThumbnail(item, parentIndex, childIndex) {
            if (item.type == 'vr') {
                this.$emit('clickVR', {
                    linkUrl: item.link_url,
                    note: item.note
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
                const slideEle = document.querySelectorAll(`[data-parent-index='${parentIndex}']`)[childIndex];
                this.swiper.slideTo(this.getIndex(slideEle), 0, () => {
                    this.swiper.lazy.load();
                });
            });
        },
        count(swiperList) {
            let i = 0;
            swiperList.forEach((item) => {
                item.img.forEach((img) => {
                    i++;
                });
            });
            return i;
        },
        getTypeClass(type) {
            if (type == 'vr') {
                return 'vr-logo';
            } if (type == 'video') {
                return 'video-logo';
            }
            return '';
        },
        onClickImg(item, pIndex, cIndex) {
            if (item.type == 'vr') {
                this.$emit('showVr', {
                    linkUrl: item.link_url,
                    note: item.note
                });
            } else if (item.type == 'video') {
                item.showType = item.showType == 'video' ? 'image' : 'video';
            }
        }
    },
    render(h) {
        const { index, count, swiperList, showPreview, onClickImg } = this;

        return (
            <div class={bem()}>
                <NavBar
                    class={showPreview ? 'preview' : 'default'}
                    left-arrow
                    fixed
                    border={false}
                    on-click-left={() => {
                        this.$emit('close');
                    }}>
                    <span slot="title">{ index + 1 }/{count(swiperList)}</span>
                    { this.showNavRight && <span slot="right" onClick={this.onClickAllImg}>{ this.navRightText }</span> }
                </NavBar>

                <div vShow={showPreview} class="image-preview-wrap">
                    <div class="imglist-type">
                        <Scroll ref="scroll" direction="horizontal" class="horizontal-scroll-list-wrap">
                            <div class="scroll-content list-wrapper">
                                <div class="scroll-item">
                                    { swiperList && swiperList.map((item, scrollIndex) => (
                                        <span
                                            class={['type-item', 'list-item', { active: this.parentIndex == scrollIndex }]}
                                            onClick={() => { this.slideToParent(scrollIndex); }}>{ item.name }{
                                                item.img.length > 1 ? `(${item.img.length})` : ''
                                            }</span>
                                    )) }
                                </div>
                            </div>
                        </Scroll>
                    </div>

                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            {swiperList && swiperList.map((imgType, pIndex) => (imgType.img && imgType.img.map((img, cIndex) => (
                                <div
                                    key={`${imgType.name}-${cIndex}`}
                                    class="swiper-slide"
                                    data-parent-index={pIndex}
                                    data-child-index={cIndex}>
                                    {
                                        img.showType == 'video' ?
                                            (
                                                <div class="video-container swiper-zoom-container">
                                                    <iframe
                                                        id="video-iframe"
                                                        class="video-iframe"
                                                        src={img.link_url}
                                                        frameborder="0"
                                                        allow="autoplay" />
                                                </div>
                                            ) :
                                            (
                                                <div class={img.type ? ['swiper-item-container'] : 'swiper-item-container swiper-zoom-container'}>
                                                    <img
                                                        data-src={img.src}
                                                        alt={img.note}
                                                        class="swiper-lazy"
                                                        onClick={
                                                            () => { onClickImg(img, pIndex, cIndex); }
                                                        }/>
                                                    {img.type && this.slots(img.type)}
                                                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
                                                </div>
                                            )}
                                </div>))))}
                        </div>
                    </div>
                </div>

                <div vShow={!showPreview} class="img-list">
                    <Tabs
                        vModel={this.active}
                        scrollspy
                        sticky
                        offsetTop={86}>
                        { swiperList && swiperList.map((imgType, pIndex) => (
                            <Tab
                                key={pIndex}
                                title={imgType.name}>
                                <div class="img-block page-block">
                                    <h3 class="title">
                                        { imgType.name }({ imgType.img.length })
                                    </h3>
                                    <div class="img-container">
                                        <div class="img-container-wrap">
                                            { imgType.img && imgType.img.map((img, cIndex) => (
                                                <div
                                                    class="img-item">
                                                    <div
                                                        class={['img-wrap', this.getTypeClass(img.type)]}
                                                        onClick={() => { this.onClickThumbnail(img, pIndex, cIndex); }}>
                                                        <img
                                                            vLazy={img.thumb}
                                                            alt={img.note}/>
                                                        {img.type && this.slots(img.type)}
                                                    </div>
                                                    <div class="img-text ellipsis">{img.note}</div>
                                                </div>
                                            )) }
                                        </div>
                                    </div>
                                </div>
                            </Tab>)) }
                    </Tabs>
                </div>
                {this.slots('default')}
                {this.slots('footer')}
            </div>);
    }
});
