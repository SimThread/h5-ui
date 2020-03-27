import { createNamespace } from '../_utils';

const [createComponent, bem] = createNamespace('tabbar');

export default createComponent({
    data() {
        return {
            items: []
        };
    },

    props: {
        value: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },

    watch: {
        items() {
            this.setActiveItem();
        },

        value() {
            this.setActiveItem();
        }
    },

    methods: {
        setActiveItem() {
            this.items.forEach((item, index) => {
                item.active = index === this.value;
            });
        },

        onChange(active) {
            if (active !== this.value) {
                this.$emit('input', active);
                this.$emit('change', active);
            }
        }
    },

    render(h) {
        return (
            <div
                style={{ zIndex: this.zIndex }}
                class={['van-hairline--top-bottom', bem({ fixed: this.fixed })]}
            >
                {this.slots()}
            </div>
        );
    }
});
