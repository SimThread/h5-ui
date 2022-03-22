import { defineComponent, reactive, watch } from 'vue';
import { createNamespace } from '../utils';
import { isSrc } from '../utils/validate';

const [name, bem] = createNamespace('icon');

export default defineComponent({
    name,

    props: {
        name: String,
        size: String,
        color: String,
        classPrefix: {
            type: String,
            default: 'h5-icon'
        }
    },

    setup(props, { emit, slots }) {
        const urlIcon = isSrc(props.name);

        return () => (
            <i
                class={[
                    props.classPrefix,
                    urlIcon ? 'h5-icon--image' : `${props.classPrefix}-${props.name}`
                ]}
                style={{
                    color: props.color,
                    fontSize: props.size
                }}
            >
                {urlIcon && <img src={props.name} />}
            </i>
        );
    }
});
