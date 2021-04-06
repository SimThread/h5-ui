import { createNamespace } from '../utils';
import { cellProps } from '../cell/shared';
import FindParent from '../mixins/find-parent';

const [createComponent] = createNamespace('share-popup-item');

export default createComponent({
    mixins: [FindParent],

    props: {
        ...cellProps,
        name: [String, Number],
        imgSrc: String,
        text: String,
        isLink: {
            type: Boolean,
            default: true
        }
    },

    created() {
        this.findParent('h5-share-popup');
    },

    render(h) {
        return (
            <li>
                <div>
                    <img src={this.imgSrc}/>
                    <p>{ this.text }</p>
                </div>
            </li>
        );
    }
});
