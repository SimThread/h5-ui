import { defineComponent, reactive, watch } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('empty');

const PRESET_IMAGES = ['error', 'search', 'default'];

export default defineComponent({
    name,

    props: {
        imageWidth: [Number, String],
        imageHeight: [Number, String],
        description: String,
        image: {
            type: String,
            default: 'default',
        },
    },

    setup(props, { emit, slots }) {
        const state = reactive({
            style: {
                width: props.imageWidth ? `${props.imageWidth}` : null,
                height: props.imageHeight ? `${props.imageHeight}` : null,
            }
        });

        const renderImage = () => {
            if (slots.image) {
                return slots.image();
            }

            let { image } = props;

            if (PRESET_IMAGES.indexOf(image) !== -1) {
                image = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
            }

            return <img src={image} />;
        };

        const renderDescription = () => {
            const description = slots.description
                ? slots.description()
                : props.description;

            if (description) {
                return <p class={bem('description')}>{description}</p>;
            }
        };

        const renderBottom = () => {
            if (slots.default) {
                return <div class={bem('bottom')}>{slots.default()}</div>;
            }
        };

        return () => (
            <div class={bem()}>
                <div class={bem('image')} style={state.style}>
                    {renderImage()}
                </div>
                {renderDescription()}
                {renderBottom()}
            </div>
        );
    },
});
