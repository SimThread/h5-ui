import { createNamespace } from '../_utils';

const [createComponent, bem] = createNamespace('empty');

const PRESET_IMAGES = ['error', 'search', 'default'];

export default createComponent({
    props: {
        imageWidth: [Number, String],
        imageHeight: [Number, String],
        description: String,
        image: {
            type: String,
            default: 'default',
        },
    },

    data() {
        return {
            style: {
                width: this.imageWidth ? `${this.imageWidth}` : null,
                height: this.imageHeight ? `${this.imageHeight}` : null,
            }
        };
    },

    render(h) {
        const { slots } = this;

        const renderImage = () => {
            if (slots.image) {
                return slots.image();
            }

            let { image } = this;

            if (PRESET_IMAGES.indexOf(image) !== -1) {
                image = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
            }

            return <img src={image} />;
        };

        const renderDescription = () => {
            const description = slots.description
                ? slots.description()
                : this.description;

            if (description) {
                return <p class={bem('description')}>{description}</p>;
            }
        };

        const renderBottom = () => {
            if (slots.default) {
                return <div class={bem('bottom')}>{slots.default()}</div>;
            }
        };

        return (
            <div class={bem()}>
                <div class={bem('image')} style={this.style}>
                    {renderImage()}
                </div>
                {renderDescription()}
                {renderBottom()}
            </div>
        );
    },
});
