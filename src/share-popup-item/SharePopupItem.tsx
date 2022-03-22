import { defineComponent } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('share-popup-item');

export default defineComponent({
    name,
    props: {
        name: [String, Number],
        imgSrc: String,
        text: String,
        isLink: {
            type: Boolean,
            default: true
        }
    },

    setup(props, { emit, slots }) {
        return () => (
            <li>
                <div>
                    <img src={props.imgSrc}/>
                    <p>{ props.text }</p>
                </div>
            </li>
        );
    }
});
