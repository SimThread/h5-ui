import {
    createNamespace
} from '../utils';

const [createComponent, bem] = createNamespace('svg-icon');

export default createComponent({
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
    computed: {
        iconName () {
            return `#icon-${this.name}`;
        }
    },
    render(h) {
        return (<svg
            class={bem()}
            aria-hidden={true}
            width={this.width}
            height={this.height}
            fill={this.color}>
            <use xlinkHref={this.iconName} />
        </svg>);
    }
});
