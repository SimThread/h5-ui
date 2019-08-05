import deepClone from '../utils/deep-clone';
import { use, isObj, range } from '../utils';

const DEFAULT_DURATION = 200;
const [sfc, bem] = use('select-column');

export default sfc({
  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    defaultIndex: {
        type: [Number, Array],
        default: 0,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    initialOptions: Array,
    visibleItemCount: Number
  },

  data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: deepClone(this.initialOptions),
      currentIndex: deepClone(this.defaultIndex)
    };
  },

  created() {
    this.$parent.children && this.$parent.children.push(this);
    this.setIndex(this.currentIndex);
  },

  destroyed() {
    const { children } = this.$parent;
    children && children.splice(children.indexOf(this), 1);
  },

  watch: {
    defaultIndex() {
      console.log('change:', this.defaultIndex);
      this.setIndex(this.defaultIndex);
    }
  },

  computed: {
    count() {
      return this.options.length;
    }
  },

  methods: {
    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startOffset = this.offset;
      this.duration = 0;
    },

    onTouchMove(event) {
      event.preventDefault();
      const deltaY = event.touches[0].clientY - this.startY;
      this.offset = range(
        this.startOffset + deltaY,
        -(this.count * this.itemHeight),
        this.itemHeight
      );
    },

    onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION;
        const index = range(Math.round(-this.offset / this.itemHeight), 0, this.count - 1);
        this.setIndex(index, true);
      }
    },

    reset() {
      this.options = deepClone(this.initialOptions);
      this.currentIndex = deepClone(this.defaultIndex);
    },

    adjustIndex(index) {
      index = range(index, 0, this.count);
      for (let i = index; i < this.count; i++) {
        if (!this.isDisabled(this.options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.options[i])) return i;
      }
    },

    isDisabled(option) {
      return isObj(option) && option.disabled;
    },

    getOptionText(option) {
      return isObj(option) && this.valueKey in option ? option[this.valueKey] : option;
    },

    setIndex(index, userAction) {
    //   index = this.adjustIndex(index) || 0;
    //   this.offset = -index * this.itemHeight;
        // 数组一定改变
      if (index !== this.currentIndex || this.multiple) {
        this.currentIndex = index;
        userAction && this.$emit('change', index);
      }
    },

    setValue(value) {
      const { options } = this;
      for (let i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
    },

    getValue() {
        if (!this.multiple) {
            return this.options[this.currentIndex];
        } else {
            return this.currentIndex.map((index) => {
                return this.options[index];
            });
        }
    }
  },
    
    render(h) {
        return (this.options && this.options.length > 0) && (
            <div class={[bem()]}>
                <ul>
                    {this.options.map((option, index) => (
                        <li
                            class={[
                                'h5-ellipsis',
                                bem('item', {
                                    disabled: this.isDisabled(option),
                                    selected: !this.multiple ? index === this.currentIndex : this.currentIndex.indexOf(index) !== -1
                                })
                            ]}
                            domPropsInnerHTML={this.getOptionText(option)}
                            onClick={() => {
                                if (this.multiple) {
                                    if (this.currentIndex.indexOf(index) !== -1) {
                                        this.currentIndex.splice(this.currentIndex.findIndex(item => item === index), 1);
                                    } else {
                                        this.currentIndex.push(index);
                                    }
                                    index = this.currentIndex;
                                }
                                this.setIndex(index, true);
                            }}></li>
                    ))}
                </ul>
            </div>
        );
    }
});