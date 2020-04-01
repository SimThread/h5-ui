// Utils
import { createNamespace, addUnit } from '../_utils';
import { inherit } from '../_utils/functional';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../_utils/types';

export type SkeletonProps = {
  row: number | string;
  title?: boolean;
  loading: boolean;
  animate: boolean;
  avatar?: boolean;
  avatarSize: string;
  avatarShape: 'square' | 'round';
  titleWidth: number | string;
  rowWidth: number | string | (number | string)[];
  // 扩展
  home?: boolean;
  homeItems?: number | string;
  list?: boolean;
  reverse?: boolean;
  detail?: boolean;
  topRow: number | string;
  bottomRow: number | string;
};

const [createComponent, bem] = createNamespace('skeleton');
const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

function Skeleton(
    h: CreateElement,
    props: SkeletonProps,
    slots: DefaultSlots,
    ctx: RenderContext
) {
    if (!props.loading) {
        return slots.default && slots.default();
    }

    function Title() {
        if (props.title) {
            return (
                <h3 class={bem('title')} style={{ width: addUnit(props.titleWidth) }} />
            );
        }
    }

    function Rows() {
        const Rows = [];
        const { rowWidth } = props;

        function getRowWidth(index: number) {
            if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
                return DEFAULT_LAST_ROW_WIDTH;
            }

            if (Array.isArray(rowWidth)) {
                return rowWidth[index];
            }

            return rowWidth;
        }

        for (let i = 0; i < props.row; i++) {
            Rows.push(
                <div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />
            );
        }

        return Rows;
    }

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

    function Avatar() {
        if (props.avatar) {
            const size = addUnit(props.avatarSize);
            return (
                <div
                    class={bem('avatar', props.avatarShape)}
                    style={{ width: size, height: size }}
                />
            );
        }
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

    if (props.home) {
        return (
            <div class={bem({ animate: props.animate, home: props.home })} {...inherit(ctx)}>
                <div class={bem('items-wrap')}>{HomeItem()}</div>
            </div>
        );
    }

    if (props.list) {
        const listChildren = [
          <div class={bem('list-img')}></div>,
          <div class={bem('list-content')}>
              {Rows()}
          </div>,
        ];

        props.reverse && listChildren.reverse();
        return (
          <div class={bem({ animate: props.animate, list: props.list })} {...inherit(ctx)}>
            {listChildren}
          </div>
        );
    }

    if (props.detail) {
      return (
        <div class={bem({ detail: props.detail, animate: props.animate })} {...inherit(ctx)}>
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
        <div class={bem({ animate: props.animate })} {...inherit(ctx)}>
            {Avatar()}
            <div class={bem('content')}>
                {Title()}
                {Rows()}
            </div>
        </div>
    );
}

Skeleton.props = {
    title: Boolean,
    avatar: Boolean,
    row: {
        type: [Number, String],
        default: 0,
    },
    loading: {
        type: Boolean,
        default: true,
    },
    animate: {
        type: Boolean,
        default: true,
    },
    avatarSize: {
        type: String,
        default: '32px',
    },
    avatarShape: {
        type: String,
        default: 'round',
    },
    titleWidth: {
        type: [Number, String],
        default: '40%',
    },
    rowWidth: {
        type: [Number, String, Array],
        default: DEFAULT_ROW_WIDTH,
    },
    // 扩展
    home: Boolean,
    homeItems: {
        type: [Number, String],
        default: 0,
    },
    list: Boolean,
    reverse: Boolean,
    detail: Boolean,
    topRow: {
      type: [Number, String],
      default: 0,
    },
    bottomRow: {
      type: [Number, String],
      default: 0,
    },
};

export default createComponent<SkeletonProps>(Skeleton);
