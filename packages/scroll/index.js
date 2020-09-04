import BScroll from 'better-scroll';
import {
    createNamespace
} from '../_utils';

const [createComponent, bem] = createNamespace('scroll');

export default createComponent({
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    watch: {
        data () {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    },
    mounted () {
        setTimeout(() => {
            this.initScroll();
        }, 20);
    },
    methods: {
        initScroll () {
            if (!this.$refs.wrapper) {
                return;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });

            if (this.listenScroll) {
                const me = this;
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos);
                });
            }

            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd');
                    }
                });
            }

            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll');
                });
            }
        },
        disable () {
            this.scroll && this.scroll.disable();
        },
        enable () {
            this.scroll && this.scroll.enable();
        },
        refresh () {
            this.scroll && this.scroll.refresh();
        },
        scrollTo (...args) {
            this.scroll && this.scroll.scrollTo.call(this.scroll, ...args);
        },
        scrollToElement (...args) {
            this.scroll && this.scroll.scrollToElement.call(this.scroll, ...args);
        }
    },
    render(h) {
        return (
            <div ref="wrapper" class={[bem(), 'wrapper']}>
                {this.slots()}
            </div>
        );
    }
});
