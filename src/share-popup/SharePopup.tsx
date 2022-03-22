import { defineComponent, reactive, watch } from 'vue';
import { createNamespace } from '../utils';
import { Popup } from 'vant';

const [name, bem] = createNamespace('share-popup');

export default defineComponent({
    name,

    components: {
        'Popup': Popup
    },

    props: {
        modelValue: Boolean,
        showPanel: Boolean,
        panelTip: String,
        panelContent: String,
    },

    emits: [
        'update:showPanel',
        'update:modelValue'
    ],

    setup(props, { emit, slots }) {
        const state = reactive({
            showPopup: props.modelValue,
            copyPanelShow: false,
        });

        const closeShare = () => {
            if (state.showPanel) {
                emit('update:showPanel', false);
            } else {
                emit('update:modelValue', false);
            }
        };

        watch(() => props.modelValue, (newVal) => {
            state.showPopup = newVal;
        });

        watch(() => state.showPopup, (newVal) => {
            emit('update:modelValue', newVal);
        });

        return () => (<Popup 
            class={bem('wrapper')} 
            v-model:show={state.showPopup} 
            position="bottom">
            <ul class="clearfix">
                {slots.default?.()}
            </ul>
            <span class="share-cancel" onClick={closeShare}>取消</span>

            <div v-show={props.showPanel}>
                { slots.panel?.() || (
                    <div class="copy-panel">
                        <p v-html={props.panelTip}></p>
                        <span v-html={props.panelContent}></span>
                    </div>
                )}
            </div>
        </Popup>);
    }
});
