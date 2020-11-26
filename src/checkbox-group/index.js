import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('checkbox-group');

export default createComponent({
    props: {
        max: Number,
        value: Array,
        disabled: Boolean
    },

    watch: {
        value(val) {
            this.$emit('change', val);
        }
    },

    render(h) {
        return <div class={bem()}>{this.slots()}</div>;
    }
});
