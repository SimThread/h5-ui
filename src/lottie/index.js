import {
    createNamespace
} from '../utils';
import lottie from 'lottie-web';

const [createComponent, bem] = createNamespace('lottie');

export default createComponent({
    props: {
        options: {
            type: Object,
            required: true
        },
        height: Number,
        width: Number,
    },
    data () {
        return {
            style: {
                width: this.width ? `${this.width}px` : '100%',
                height: this.height ? `${this.height}px` : '100%',
            }
        };
    },

    mounted () {
        this.$nextTick(() => {
            this.anim = lottie.loadAnimation({
                container: this.$refs.lavContainer,
                renderer: 'svg',
                loop: this.options.loop !== false,
                autoplay: this.options.autoplay !== false,
                // animationData: this.options.animationData,
                path: this.options.path,
                rendererSettings: this.options.rendererSettings
            }
            );
            this.$emit('animCreated', this.anim);
        });
    },
    render(h) {
        return (
            <div class={bem('lottie-container')} style={this.style} ref="lavContainer"></div>);
    }
});
