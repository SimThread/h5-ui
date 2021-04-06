import {
    createNamespace
} from '../utils';

const [createComponent, bem] = createNamespace('collapse');

export default createComponent({
    props: {
        accordion: Boolean,
        value: [String, Number, Array]
    },

    data() {
        return {
            items: []
        };
    },

    methods: {
        switch(name, expanded) {
            if (!this.accordion) {
                name = expanded
                    ? this.value.concat(name)
                    : this.value.filter(activeName => activeName !== name);
            }
            this.$emit('change', name);
            this.$emit('input', name);
        }
    },

    render(h) {
        return <div class={[bem(), 'h5-hairline--top-bottom']}>{this.slots()}</div>;
    }
});
