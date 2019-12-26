/* eslint-disable object-shorthand */
import { use } from '../_utils';
import findParent from '../_mixins/find-parent';

const [sfc, bem] = use('filter-area-panel');

export default sfc({
    mixins: [findParent],

    props: {
        title: String,
        disabled: Boolean,
        highlight: {
            type: Boolean,
            default: false,
        },
        immediateRender: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            inited: false
        };
    },

    computed: {
        index() {
            return this.parent.tabs.indexOf(this);
        },

        selected() {
            return this.index === this.parent.curActive;
        }
    },

    watch: {
        'parent.curActive'() {
            this.inited = this.inited || this.selected;
        },

        title() {
            this.parent.setLine();
        }
    },

    created() {
        this.findParent('h5-filter-area');
    },

    mounted() {
        const { tabs } = this.parent;
        const index = this.parent.slots().indexOf(this.$vnode);
        tabs.splice(index === -1 ? tabs.length : index, 0, this);

        if (this.slots('title')) {
            this.parent.renderTitle(this.$refs.title, this.index);
        }
    },

    beforeDestroy() {
        this.parent.tabs.splice(this.index, 1);
    },

    render(h) {
        const { slots } = this;
        return (
            <div vShow={this.selected || this.parent.animated} class={bem('pane')}>
                {this.immediateRender || this.inited ? slots() : h()}
                {slots('title') && <div ref="title">{slots('title')}</div>}
            </div>
        );
    }
});
