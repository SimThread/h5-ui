import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('overlay');

export default {
  props: {
    zIndex: Number,
    className: null,
    visible: Boolean,
    customStyle: Object,
  },

  render(h) {
    const style = {
      zIndex: this.zIndex,
      ...this.customStyle,
    };

    return (
      <transition name="h5-fade">
        <div
          vShow={this.visible}
          style={style}
          class={[bem(), this.className]}
          onTouchmove={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            this.$emit('click', event);
          }}
        />
      </transition>
    );
  },
};
