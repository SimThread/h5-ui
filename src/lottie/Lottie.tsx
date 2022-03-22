import { defineComponent, ref, reactive, nextTick, onMounted } from 'vue';
import {
    createNamespace
} from '../utils';
import lottie from 'lottie-web';

const [name, bem] = createNamespace('lottie');

export default defineComponent({
    name,

    props: {
        options: {
            type: Object,
            required: true
        },
        height: Number,
        width: Number,
    },

    emits: ["animCreated"],

    setup(props, { emit, slots }) {
        const state = reactive({
            style: {
                width: props.width ? `${props.width}px` : '100%',
                height: props.height ? `${props.height}px` : '100%',
            }
        });
        const lavContainer = ref(null);

        onMounted(() => {

            nextTick(() => {
                const anim = lottie.loadAnimation({
                    container: lavContainer.value,
                    renderer: 'svg',
                    loop: props.options.loop !== false,
                    autoplay: props.options.autoplay !== false,
                    // animationData: props.options.animationData,
                    path: props.options.path,
                    rendererSettings: props.options.rendererSettings
                });
                emit('animCreated', anim);
            });
        });

        return () => (<div class={bem('lottie-container')} style={state.style} ref={lavContainer}></div>);
    }
});
