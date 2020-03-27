import { createNamespace } from '../_utils';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('share-popup');

export default createComponent({
    props: {
        value: Boolean,
        showPanel: Boolean,
        panelTip: String,
        panelContent: String,
    },
    data() {
        return {
            showPopup: this.value,
            copyPanelShow: false,
        };
    },
    watch: {
        value(newVal) {
            this.showPopup = newVal;
        },
        showPopup(newVal) {
            this.$emit('input', newVal);
        }
    },
    methods: {
        closeShare() {
            if (this.showPanel) {
                this.$emit('update:showPanel', false);
            } else {
                this.$emit('input', false);
            }
        },
        copyShare() {
            this.copyPanelShow = true;
        },
    },
    render(h) {
        return (
            <Popup class={bem('wrapper')} vModel={this.showPopup} position="bottom">
                <ul class="clearfix">
                    {this.slots()}
                </ul>
                <span class="share-cancel" onClick={this.closeShare}>取消</span>

                <div vShow={this.showPanel}>
                    { this.slots('panel') || (
                        <div class="copy-panel">
                            <p domPropsInnerHTML={this.panelTip}></p>
                            <span domPropsInnerHTML={this.panelContent}></span>
                        </div>
                    )}
                </div>
            </Popup>);
    }
});
