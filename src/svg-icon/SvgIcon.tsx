import { defineComponent, computed } from 'vue';
import {
    createNamespace
} from '../utils';

const [name, bem] = createNamespace('svg-icon');

export default defineComponent({
    name,

    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: '1em'
        },
        height: {
            type: [Number, String],
            default: '1em'
        }
    },

    setup(props, { emit, slots }) {
        const iconName = computed(() => `#icon-${props.name}`);

        return () => (<svg
            class={bem()}
            aria-hidden={true}
            width={props.width}
            height={props.height}
            fill={props.color}>
            <use xlinkHref={iconName.value} />
        </svg>);
    }
});
