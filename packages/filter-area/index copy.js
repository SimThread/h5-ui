import { use, isDef } from '../utils';

import findParent from '../mixins/find-parent';
const [sfc, bem] = use('filter-area');

export default sfc({
    model: {
        prop: 'active'
    },
    mounted() {
        this.$nextTick(() => {
            this.menuTop = this.$refs.menu.getBoundingClientRect().top;
            this.menuHeight = this.$refs.menu.clientHeight;
        });
    },
    data() {
        return {
            tabs: [],
            menuTop: 0,
            menuHeight: 0,
        }
    },

    watch: {
        active(val) {
            if (val !== this.curActive) {
                this.correntActive(Val);
            }
        }
    },

    methods: {
        // 矫正正确的active值
        correctActive(active) {
            active = +active;
            const exist = this.tabs.some(tab => tab.index === active);
            const defaultActive = (this.tabs[0] || {}).index || 0;
            this.setCurActive(exist ? active : defaultActive);
        },

        setCurActive(active) {
            active = this.findAvailableTab(active, active < this.curActive);
            if (isDef(active) && active !== this.curActive) {
              this.$emit('input', active);
      
              if (this.curActive !== null) {
                this.$emit('change', active, this.tabs[active].title);
              }
              this.curActive = active;
            }
        },
    },

    render(h) {
        console.log(this.tabs);
        const Nav = this.tabs.map((tab, index) => (
            <div
              ref="tabs"
              refInFor
              class={tabBem({
                active: index === this.curActive,
                disabled: tab.disabled,
                complete: !ellipsis
              })}
              style={this.getTabStyle(tab, index)}
              onClick={() => {
                this.onClick(index);
              }}
            >
              <span ref="title" refInFor class={{ 'van-ellipsis': ellipsis }}>
                {tab.title}
              </span>
            </div>
        ));

        const overlayer = (<div style={{top: `${this.menuTop}px`}} vShow="true" class={bem('overlayer')}></div>);

        return (
            <div class={bem()}>
              <div
                ref="wrap"
                style={this.wrapStyle}
                class={[bem('wrap')]}
              >
                <div ref="nav" class={bem('nav')} style={this.navStyle}>
                  {Nav}
                </div>
              </div>
              <div ref="content" class={bem('content', { animated })}>
                {animated ? (
                  <div class={bem('track')} style={this.trackStyle}>
                    {this.slots()}
                  </div>
                ) : (
                  this.slots()
                )}
              </div>
            </div>
          );
    }
});