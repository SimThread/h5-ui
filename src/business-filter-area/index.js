import { createNamespace, isDef } from '../utils';
import { on, off } from '../utils/dom/event';
import { TouchMixin } from '../mixins/touch';

import manager from '../mixins/popup/manager';
import context from '../mixins/popup/context';
import { getScrollTop, getElementTop, getScrollEventTarget } from '../utils/dom/scroll';

const [createComponent, bem] = createNamespace('business-filter-area');
const tabBem = createNamespace('business-filter-area-panel')[1];

export default createComponent({
    mixins: [TouchMixin],

    model: {
        prop: 'active',
    },

    props: {
        color: String,
        sticky: {
            type: Boolean,
            default: true
        },
        animated: Boolean,
        offsetTop: {
            type: Number,
            default: 0
        },
        swipeable: Boolean,
        ellipsis: {
            type: Boolean,
            default: true
        },
        lineWidth: {
            type: Number,
            default: null
        },
        lineHeight: {
            type: Number,
            default: null
        },
        active: {
            type: [Number, String],
            default: -1
        },
        type: {
            type: String,
            default: 'line'
        },
        duration: {
            type: Number,
            default: 0.3
        },
        swipeThreshold: {
            type: Number,
            default: 4
        },

        // 是否显示弹窗
        // value: Boolean,
        // 是否显示蒙版
        overlay: {
            type: Boolean,
            default: true
        },
        // 自定义蒙版样式
        overlayStyle: Object,
        // 自定义蒙版类名
        overlayClass: String,
        // 是否点击蒙版时关闭弹窗,在mixins/popup中调用
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        // z-index
        zIndex: [String, Number],
        // 返回挂载蒙版的节点
        getContainer: [String, Function],
        // prevent body scroll
        lockScroll: {
            type: Boolean,
            default: true
        },
        // whether to lazy render
        lazyRender: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {
            tabs: [],
            tabsTop: 0,
            contentTop: 0,
            position: '',
            curActive: null,
            events: {
                resize: false,
                sticky: false,
                swipeable: false
            },
        };
    },

    computed: {
        wrapStyle() {
            switch (this.position) {
            case 'top':
                return {
                    top: this.offsetTop + 'px',
                    position: 'fixed'
                };
            case 'bottom':
                return {
                    top: 'auto',
                    bottom: 0
                };
            default:
                return null;
            }
        },

        filterStyle() {
            if (this.contentTop) {
                return {
                    paddingTop: this.contentTop + 'px',
                };
            }
            return null;
        },

        navStyle() {
            return {
                borderColor: this.color
            };
        },

        trackStyle() {
            if (this.animated) {
                return {
                    left: `${-1 * this.curActive * 100}%`,
                    transitionDuration: `${this.duration}s`
                };
            }
        }
    },

    watch: {
        active(val) {
            if (val !== this.curActive) {
                this.correctActive(val);
            }
        },
        tabs() {
            this.correctActive(this.curActive || this.active);
        },

        curActive(val) {
            if (isDef(this.curActive) && this.curActive >= 0) {
                this.open();
            } else {
                this.close();
            }
        },

        sticky() {
            this.handlers(true);
        },

        swipeable() {
            this.handlers(true);
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.inited = true;
            this.handlers(true);
            // this.tabsTop = getElementTop(this.$el);
        });
    },

    activated() {
        this.$nextTick(() => {
            this.handlers(true);
        });
    },

    deactivated() {
        this.close();
        this.handlers(false);
    },

    beforeDestroy() {
        this.close();
        this.handlers(false);
    },

    methods: {
        contentStyle() {
            let wrapHeight = 0;
            if (this.$refs.wrap && this.$refs.wrap.offsetHeight) {
                wrapHeight = this.$refs.wrap.offsetHeight;
            }
            return {
                top: this.offsetTop + wrapHeight + 'px',
                position: 'fixed'
            };
        },
        // whether to bind sticky listener
        handlers(bind) {
            const { events } = this;
            const sticky = this.sticky && bind;

            // 监听window的resize事件
            if (events.resize !== bind) {
                events.resize = bind;
            }

            // 监听目标元素this.scrollEl的scroll事件
            if (events.sticky !== sticky) {
                events.sticky = sticky;
                this.scrollEl = this.scrollEl || getScrollEventTarget(this.$el);
                (sticky ? on : off)(this.scrollEl, 'scroll', this.adjustPosition, true);
                this.adjustPosition();
            }
        },

        // watch swipe touch end
        onTouchEnd() {
            const { direction, deltaX, curActive } = this;
            const minSwipeDistance = 50;

            /* istanbul ignore else */
            if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
                /* istanbul ignore else */
                if (deltaX > 0 && curActive !== 0) {
                    this.setCurActive(curActive - 1);
                } else if (deltaX < 0 && curActive !== this.tabs.length - 1) {
                    this.setCurActive(curActive + 1);
                }
            }
        },

        // 调整定位
        adjustPosition() {
            const scrollTop = getScrollTop(window) + this.offsetTop;
            const elTopToPageTop = getElementTop(this.$el);
            if (scrollTop > elTopToPageTop) {
                this.position = 'top';
                this.contentTop = `${this.$refs.wrap.offsetHeight}`;
            } else {
                this.position = '';
                this.contentTop = '';
            }
            const scrollParams = {
                scrollTop,
                isFixed: this.position === 'top'
            };
            this.$emit('scroll', scrollParams);
        },

        // correct the value of active
        correctActive(active) {
            active = +active;
            const exist = this.tabs.some(tab => tab.index === active);
            // const defaultActive = (this.tabs[0] || {}).index;
            this.setCurActive(exist ? active : -1);
        },

        setCurActive(active) {
            if (active !== this.curActive) {
                this.$emit('input', active);

                if (this.curActive !== null) {
                    this.$emit('change', active, this.tabs[active] && this.tabs[active].title);
                }
                this.curActive = active;
            }
        },

        // 点击标题Tab时触发
        onTabClick(index) {
            // 关闭筛选区
            if (index === this.curActive) {
                this.setCurActive(-1);
                return;
            }

            this.position = 'top';
            const { title, disabled } = this.tabs[index];
            if (disabled) {
                this.$emit('disabled', index, title);
            } else {
                this.setCurActive(index);
                this.$emit('click', index, title);
            }
        },

        onClickOverlay() {
            this.position = '';
            this.setCurActive(-1);
        },

        // 为面板渲染标题
        renderTitle(el, index) {
            this.$nextTick(() => {
                const title = this.$refs.title[index];
                title.parentNode.replaceChild(el, title);
            });
        },

        // 开启蒙版
        open() {
            /* istanbul ignore next */
            if (this.$isServer || this.opened) {
                return;
            }

            // cover default zIndex
            if (this.zIndex !== undefined) {
                context.zIndex = this.zIndex;
            }

            this.opened = true;
            this.renderOverlay();

            if (this.lockScroll) {
                on(document, 'touchstart', this.touchStart);
                on(document, 'touchmove', this.onTouchMove);

                if (!context.lockCount) {
                    document.body.classList.add('h5-overflow-hidden');
                }
                context.lockCount++;
            }
        },

        // 关闭蒙版
        close() {
            if (!this.opened) {
                return;
            }

            if (this.lockScroll) {
                context.lockCount--;
                off(document, 'touchstart', this.touchStart);
                off(document, 'touchmove', this.onTouchMove);

                if (!context.lockCount) {
                    document.body.classList.remove('h5-overflow-hidden');
                }
            }

            this.opened = false;
            manager.close(this);

            this.adjustPosition();
        },

        renderOverlay() {
            if (this.overlay) {
                manager.open(this, {
                    zIndex: context.zIndex++,
                    className: this.overlayClass,
                    customStyle: { top: `${this.offsetTop + this.$refs.wrap.offsetHeight}px`, ...this.overlayStyle },
                });
            }

            this.$nextTick(() => {
                this.$el.style.zIndex = context.zIndex++;
            });
        }
    },

    render(h) {
        const { type, ellipsis, animated } = this;

        const Nav = this.tabs.map((tab, index) => (
            <div
                ref="tabs"
                refInFor
                class={[tabBem({
                    active: index === this.curActive,
                    disabled: tab.disabled,
                    complete: !ellipsis,
                    highlight: tab.highlight,
                }), bem('title')]}
                onClick={() => {
                    this.onTabClick(index);
                }}
            >
                <span ref="title" refInFor class={[{ 'h5-ellipsis': ellipsis }]}>
                    {tab.title}
                </span>
            </div>
        ));

        return (
            <div ref="filterArea" class={bem([type])} style={this.filterStyle}>
                <div
                    ref="wrap"
                    style={this.wrapStyle}
                    class={[bem('wrap'), { 'h5-hairline--top-bottom': type === 'line' }]}>
                    <div ref="nav" class={bem('nav', [type])} style={this.navStyle}>
                        {Nav}
                    </div>
                </div>
                <div ref="content" class={bem('content', { animated })} style={this.contentStyle()}>
                    {animated ? (
                        <div class={bem('track')} style={this.trackStyle}>
                            {this.slots()}
                        </div>
                    ) : (
                        this.slots()
                    )}
                </div>
            </div>
        );
    }
});
