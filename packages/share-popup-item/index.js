import { use, isDef } from '../utils';
import { raf } from '../utils/raf';
import Cell from '../cell';
import { cellProps } from '../cell/shared';
import FindParent from '../mixins/find-parent';

const [sfc, bem] = use('share-popup-item');

export default sfc({
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
                <a href="javascript:;">
                    <img src={this.imgSrc}/>
                    <p>{ this.text }</p>
                </a>
            </li>
        );
    }
});