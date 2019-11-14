import { use } from '../_utils';
const [sfc, bem] = use('share-popup');
import Popup from '../popup';

export default sfc({
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
        }
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
        closeShare(){
            if(this.showPanel){
                this.$emit('update:showPanel', false);
            } else {
                this.$emit('input', false);
            }
        },
        copyShare(){
            this.copyPanelShow = true;
        },
    },
    render(h) {
        return (
            <Popup class={bem('wrapper')} vModel={this.showPopup} position="bottom">
                <ul class="clearfix">
                    {this.slots()}
                </ul>
                <a href="javascript:;" class="share-cancel" onClick={this.closeShare}>取消</a>

                <div vShow={this.showPanel}>
                    { this.slots('panel') || (
                        <div class="copy-panel">
                            <p domPropsInnerHTML={this.panelTip}></p>
                            < a href="javascript:;" domPropsInnerHTML={this.panelContent}></a>
                        </div>
                    )}
                </div>
            </Popup>);
    }
});