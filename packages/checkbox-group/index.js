import { createNamespace } from '../_utils';

const [createComponent, bem] = createNamespace('checkbox-group');

export default createComponent({
    props: {
        max: Number,
        value: Array,
        disabled: Boolean
    },

    watch: {
        value(val) {
            console.log('val:', val);
            this.$emit('change', val);
        }
    },

    render(h) {
        return <div class={bem()}>{this.slots()}</div>;
    }
});
