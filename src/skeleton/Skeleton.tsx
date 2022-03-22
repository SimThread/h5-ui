import { PropType, defineComponent } from 'vue';
import { addUnit, truthProp, getSizeStyle, createNamespace } from '../utils';

const [name, bem] = createNamespace('skeleton');
const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

export default defineComponent({
  name,

  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    loading: truthProp,
    animate: truthProp,
    avatarSize: [Number, String],
    titleWidth: [Number, String],
    row: {
      type: [Number, String],
      default: 0,
    },
    avatarShape: {
      type: String as PropType<'square' | 'round'>,
      default: 'round',
    },
    rowWidth: {
      type: [Number, String, Array] as PropType<
        number | string | (number | string)[]
      >,
      default: DEFAULT_ROW_WIDTH,
    },
    /** 扩展 */
    // 首页
    home: Boolean,
    homeItems: {
        type: [Number, String],
        default: 10,
    },
    // 列表
    list: Boolean,
    listItems: {
        type: [Number, String],
        default: 3,
    },
    listItemDistance: {
        type: [Number, String],
        default: 20,
    },
    reverse: Boolean,
    // 详情
    detail: Boolean,
    topRow: {
      type: [Number, String],
      default: 0,
    },
    bottomRow: {
      type: [Number, String],
      default: 0,
    },
  },

  setup(props, { slots }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return (
          <div
            class={bem('avatar', props.avatarShape)}
            style={getSizeStyle(props.avatarSize)}
          />
        );
      }
    };

    const renderTitle = () => {
      if (props.title) {
        return (
          <h3
            class={bem('title')}
            style={{ width: addUnit(props.titleWidth) }}
          />
        );
      }
    };

    const getRowWidth = (index: number) => {
      const { rowWidth } = props;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    const renderRows = () =>
      Array(props.row)
        .fill('')
        .map((_, i) => (
          <div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />
        ));
    
    function TopRows() {
        const Rows = [];
        const { rowWidth } = props;
    
        function getRowWidth(index: number) {
            if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.topRow - 1) {
                return DEFAULT_LAST_ROW_WIDTH;
            }
    
            if (Array.isArray(rowWidth)) {
                return rowWidth[index];
            }
    
            return rowWidth;
        }
    
        for (let i = 0; i < props.topRow; i++) {
            Rows.push(
                <div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />
            );
        }
    
        return Rows;
    }

    function BottomRows() {
        const Rows = [];
        const { rowWidth } = props;

        function getRowWidth(index: number) {
            if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.bottomRow - 1) {
                return DEFAULT_LAST_ROW_WIDTH;
            }

            if (Array.isArray(rowWidth)) {
                return rowWidth[index];
            }

            return rowWidth;
        }

        for (let i = 0; i < props.bottomRow; i++) {
            Rows.push(
                <div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />
            );
        }

        return Rows;
    }

    function HomeItem() {
        const HomeItems = [];
        for (let i = 0; i < props.homeItems; i++) {
            HomeItems.push(<div class={bem('home-item')}>
                <div
                    class={bem('circle')}
                />
                <div
                    class={bem('home-name')}
                />
            </div>);
        }
        return HomeItems;
    }

    function listItem() {
        const listItem = [
            <div class={bem('list-img')}></div>,
            <div class={bem('list-content')}>
                {renderRows()}
            </div>,
        ];
        props.reverse && listItem.reverse();
        return listItem;
    }

    function listItems() {
        const listItems = [];
        for (let i = 0; i < props.listItems; i++) {
            if (i === 0) {
                listItems.push(
                    <div class={bem('list-item')}>
                        {listItem()}
                    </div>
                );
            } else {
                    listItems.push(
                    <div class={bem('list-item')} style={{ marginTop: addUnit(props.listItemDistance) }}>
                        {listItem()}
                    </div>
                );
            }

        }

        return listItems;
    }

    return () => {
      if (!props.loading) {
        return slots.default?.();
      }

      if (props.home) {
        return (
            <div class={bem({ animate: props.animate, home: props.home })}>
                <div class={bem('items-wrap')}>{HomeItem()}</div>
            </div>
        );
    }

    if (props.list) {
        return (
          <div class={bem({ animate: props.animate, list: props.list })}>
            <div class={bem('list-item-wrap')}>
                {listItems()}
            </div>
          </div>
        );
    }

    if (props.detail) {
        return (
            <div class={bem({ detail: props.detail, animate: props.animate })}>
                <div class={[bem('detail-banner')]}></div>
                <div class={[bem('top-rows')]}>
                {TopRows()}
                </div>
                <div class={bem('split-line')}></div>
                <div class={bem('bottom-rows')}>
                {BottomRows()}
                </div>
            </div>
        );
    }

    return (
        <div class={bem({ animate: props.animate, round: props.round })}>
          {renderAvatar()}
          <div class={bem('content')}>
            {renderTitle()}
            {renderRows()}
          </div>
        </div>
      );
    };
  },
});