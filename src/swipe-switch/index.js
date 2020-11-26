import { createNamespace } from '../utils';

const [createComponent] = createNamespace('swipe-switch');

export default createComponent({
    props: {
        value: {
            type: String,
            default: ''
        },
        types: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentType: this.value || this.types[0].name
        };
    },
    watch: {
        value(newVal) {
            this.currentType = newVal;
        }
    },
    methods: {
        onChange(type) {
            this.currentType = type;
            this.$emit('input', type);
            this.$emit('change', type);
        },
        isShow(type) {
            if (this.types.length == 1 && this.types[0].name == 'image') {
                return false;
            }
            return true;
        }
    },
    render() {
        const { types, isShow } = this;

        return (
            <div class="swiper-switch">
                {types && types.map((type) => {
                    if (!isShow(type.name)) {
                        return;
                    }

                    return (
                        <span
                            class={['switch-item', { active: this.currentType == type.name }]}
                            onClick={() => { this.onChange(type.name); }}>
                            { type.text }
                        </span>);
                })}
            </div>);
    }
});
