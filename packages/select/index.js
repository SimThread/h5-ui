import { use } from '../_utils';
import deepClone from '../_utils/deep-clone';
import SelectColumn from './SelectColumn';

const [sfc, bem] = use('select');

export default sfc({
    props: {
        defaultIndex: {
            type: Number,
            default: 0
        },
        columns: Array,
        valueKey: {
            type: String,
            default: 'text'
        },
    },

    data() {
        return {
            children: []
        };
    },

    computed: {
        simple() {
            return this.columns.length && !this.columns[0].values;
        }
    },

    watch: {
        columns() {
            this.setColumns();
        }
    },

    methods: {
        setColumns() {
            const columns = this.simple ? [{ values: this.columns }] : this.columns;
            columns.forEach((column, index) => {
                this.setColumnValues(index, deepClone(column.values));
            });
        },

        emit(event) {
            if (this.simple) {
                this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                this.$emit(event, this.getValues(), this.getIndexes());
            }
        },

        onChange(columnIndex) {
        //   if (columnIndex + 1 < this.columns.length) {
        //     console.log('columnIndex:', columnIndex);
        //     console.log('this.columns:', this.columns);
        //     this.columns[columnIndex + 1].multiple ? this.columns[columnIndex + 1].defaultIndex = -1 : this.columns[columnIndex + 1].defaultIndex = [];
        //   }
            if (this.simple) {
                this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                this.$emit('change', this, this.getValues(), columnIndex);
            }
        },

        // 通过index获取column实例
        getColumn(index) {
            return this.children[index];
        },

        // 通过index获取column的值
        getColumnValue(index) {
            const column = this.getColumn(index);
            return column && column.getValue();
        },

        // 通过index设置column的值
        setColumnValue(index, value) {
            const column = this.getColumn(index);
            column && column.setValue(value);
        },

        // 通过column的index获取column的配置项
        getColumnIndex(columnIndex) {
            return (this.getColumn(columnIndex) || {}).currentIndex;
        },

        // set column option index by column index
        setColumnIndex(columnIndex, optionIndex) {
            const column = this.getColumn(columnIndex);
            column && column.setIndex(optionIndex);
        },

        // 通过index获取column的配置
        getColumnValues(index) {
            return (this.children[index] || {}).options;
        },

        // 通过index设置column的配置
        setColumnValues(index, options) {
            const column = this.children[index];
            if (column && JSON.stringify(column.options) !== JSON.stringify(options)) {
                column.options = options;

                if (!column.multiple) {
                    column.setIndex(-1);
                } else {
                    column.setIndex([]);
                }
            }
        },

        // get values of all columns
        getValues() {
            return this.children.map(child => child.getValue());
        },

        // set values of all columns
        setValues(values) {
            values.forEach((value, index) => {
                this.setColumnValue(index, value);
            });
        },

        // get indexes of all columns
        getIndexes() {
            return this.children.map(child => child.currentIndex);
        },

        // set indexes of all columns
        setIndexes(indexes) {
            indexes.forEach((optionIndex, columnIndex) => {
                this.setColumnIndex(columnIndex, optionIndex);
            });
        },

        reset (columnIndex) {
            const column = this.children[columnIndex];
            column.reset();
        },

        onConfirm() {
            this.emit('confirm');
        },

        onCancel() {
            this.emit('cancel');
        }
    },
    render(h) {
        const columns = this.simple ? [this.columns] : this.columns;

        return (
            <div class={bem()} style={{ top: `${this.menuTop + this.menuHeight}px` }} v-show="modelName == 'area'" refInFor>
                <div class={bem('panel')}>
                    <div class={[bem('content')]}>
                        {columns.map((item, index) => (
                            <SelectColumn
                                valueKey={this.valueKey}
                                className={item.className}
                                itemHeight={this.itemHeight}
                                defaultIndex={item.defaultIndex || this.defaultIndex}
                                multiple={item.multiple}
                                visibleItemCount={this.visibleItemCount}
                                initialOptions={this.simple ? item : item.values}
                                onChange={() => {
                                    this.onChange(index);
                                }}>
                            </SelectColumn>
                        ))}
                    </div>

                    {this.slots('footer')}
                </div>
            </div>
        );
    }
});
