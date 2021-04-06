import { createNamespace } from '../utils';
import Popup from '../mixins/popup';

const [createComponent, bem] = createNamespace('popup');

export default createComponent({
    mixins: [Popup],

    props: {
        position: String,
        transition: String,
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        }
    },

    render(h) {
        if (!this.shouldRender) {
            return;
        }

        const { position } = this;
        const emit = event => () => this.$emit(event);
        const transitionName = this.transition || (position ? `h5-popup-slide-${position}` : 'van-fade');

        return (
            <transition
                name={transitionName}
                onAfterEnter={emit('opened')}
                onAfterLeave={emit('closed')}
            >
                <div vShow={this.value} class={bem({ [position]: position })}>
                    {this.slots()}
                </div>
            </transition>
        );
    }
});
