import deepClone from '../_utils/deep-clone';
import { createNamespace, isObject } from '../_utils';
import { range } from '../_utils/format/number';

const DEFAULT_DURATION = 200;
const [createComponent, bem] = createNamespace('business-select-column');

export default createComponent({
    props: {
        valueKey: String,
        checkStyle: {
            type: String,
            default: ''
        },
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
        visibleItemCount: Number,
        renderItem: {
            type: Function,
            default: null
        }
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

        // 重置到初始配置项状态
        reset() {
            this.options = deepClone(this.initialOptions);
            this.currentIndex = deepClone(this.defaultIndex);
        },

        // 获取项目文本
        getOptionText(option) {
            return isObject(option) && this.valueKey in option ? option[this.valueKey] : option;
        },

        // 向上传递变化的索引（当单个索引改变或者多选时）
        setIndex(index, userAction) {
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
            }

            return this.currentIndex.map((index) => this.options[index]);
        },

        isSelected(index) {
            return !this.multiple ? index === this.currentIndex : this.currentIndex.indexOf(index) !== -1;
        },

        handleClick(index) {
            const option = this.options[index];
            if (this.multiple) {
                if (option.selectAll) {
                    if (!this.isSelected(index)) {
                        this.currentIndex = [];
                        this.options.forEach((value, index) => {
                            this.currentIndex.push(index);
                        });
                    } else {
                        this.currentIndex = [];
                    }
                    index = this.currentIndex;
                } else {
                    if (this.currentIndex.indexOf(index) !== -1) {
                        this.currentIndex.splice(this.currentIndex.findIndex(item => item === index), 1);
                    } else {
                        this.currentIndex.push(index);
                    }
                    if (this.currentIndex.length >= this.options.length) {
                        const selectAllIndex = this.options.findIndex(option => option.selectAll);
                        selectAllIndex > -1 && this.currentIndex.push(this.options[selectAllIndex]);
                    }

                    index = this.currentIndex;
                }
            }
            this.setIndex(index, true);
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
                                    selected: this.isSelected(index)
                                })
                            ]}
                            onClick={ () => this.handleClick(index)}>
                            { this.renderItem ? this.renderItem({ option, isSelected: this.isSelected(index) }) : <span class={bem('text-wrap')}>{ this.getOptionText(option) }
                            </span> }
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
});
