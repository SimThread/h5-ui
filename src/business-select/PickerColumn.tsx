import { ref, watch, reactive, PropType, defineComponent } from 'vue';

// Utils
import { deepClone } from '../utils/deep-clone';
import {
  clamp,
  isObject,
  unknownProp,
  preventDefault,
  createNamespace,
} from '../utils';

// Composables
import { useParent } from '@vant/use';
import { useTouch } from '../composables/use-touch';
import { useExpose } from '../composables/use-expose';

// Types
import type { PickerOption } from './types';

const DEFAULT_DURATION = 200;

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;

const [name, bem] = createNamespace('business-select-column');

function getElementTranslateY(element: Element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];

  return Number(translateY);
}

export const PICKER_KEY = Symbol(name);

function isOptionDisabled(option: PickerOption) {
  return isObject(option) && option.disabled;
}

export default defineComponent({
  name,

  props: {
    readonly: Boolean,
    allowHtml: Boolean,
    className: unknownProp,
    textKey: {
      type: String,
      required: true,
    },
    itemHeight: {
      type: Number,
      required: true,
    },
    swipeDuration: {
      type: [Number, String],
      required: true,
    },
    visibleItemCount: {
      type: [Number, String],
      required: true,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    initialOptions: {
      type: Array as PropType<PickerOption[]>,
      default: () => [],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    renderItem: {
        type: [Function, null],
        default: null
    }
  },

  emits: ['change'],

  setup(props, { emit, slots }) {
    let moving: boolean;
    let startOffset: number;
    let touchStartTime: number;
    let momentumOffset: number;
    let transitionEndTrigger: null | (() => void);
    
    const wrapper = ref<HTMLElement>();
    
    // let currentIndex = ref(deepClone(props.defaultIndex));
    // let index = ref(props.defaultIndex);
    // let offset = ref(0);
    // let duration = ref(0);
    // let options = ref(deepClone(props.initialOptions));
    const state = reactive({
      index: props.defaultIndex,
      offset: 0,
      duration: 0,
      options: deepClone(props.initialOptions),
      currentIndex: deepClone(props.defaultIndex)
    });

    const touch = useTouch();

    const count = () => state.options.length;

    const baseOffset = () =>
      (props.itemHeight * (+props.visibleItemCount - 1)) / 2;

    const adjustIndex = (index: number) => {
      index = clamp(index, 0, count());

      for (let i = index; i < count(); i++) {
        if (!isOptionDisabled(state.options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(state.options[i])) return i;
      }
    };

    const setIndex = (index: number, emitChange?: boolean) => {
      // 数组一定改变
      if (index !== state.currentIndex || props.multiple) {
          state.currentIndex = index;
          emitChange && emit('change', index);
      }
    };

    const setOptions = (options: PickerOption[]) => {
      if (JSON.stringify(options) !== JSON.stringify(state.options)) {
        state.options = deepClone(options);
        setIndex(props.defaultIndex);
      }
    };

    const isSelected = (index) => !props.multiple ? index === state.currentIndex : state.currentIndex.indexOf(index) !== -1

    const onClickItem = (index: number) => {
      if (moving || props.readonly) {
        return;
      }
      
      transitionEndTrigger = null;
      state.duration = DEFAULT_DURATION;
      
      const option = state.options[index];

      if (props.multiple) {
          if (option.selectAll) {
              if (!isSelected(index)) {
                  state.currentIndex = [];
                  state.options.forEach((value, index) => {
                      state.currentIndex.push(index);
                  });
              } else {
                  state.currentIndex = [];
              }
              index = state.currentIndex;
          } else {
              if (state.currentIndex.indexOf(index) !== -1) {
                  state.currentIndex.splice(state.currentIndex.findIndex(item => item === index), 1);
              } else {
                  state.currentIndex.push(index);
              }

              const selectAllIndex = state.options.findIndex(option => option.selectAll);
              if (state.currentIndex.length >= state.options.length) {
                  const curtIndex = state.currentIndex.findIndex(index => index === selectAllIndex);
                  curtIndex === -1 && state.currentIndex.push(selectAllIndex);
              } else {
                  const curtIndex = state.currentIndex.findIndex(index => index === selectAllIndex);
                  curtIndex > -1 && state.currentIndex.splice(curtIndex, 1);
              }
              index = state.currentIndex;
          }
      }
      setIndex(index, true);
    };

    const getOptionText = (option: PickerOption) => {
      if (isObject(option) && props.textKey in option) {
        return option[props.textKey];
      }
      return option;
    };

    const getIndexByOffset = (offset: number) =>
      clamp(Math.round(-offset / props.itemHeight), 0, count() - 1);

    const momentum = (distance: number, duration: any) => {
      const speed = Math.abs(distance / duration);

      distance = state.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

      const index = getIndexByOffset(distance);

      state.duration = +props.swipeDuration;
      setIndex(index, true);
    };

    const stopMomentum = () => {
      moving = false;
      state.duration = 0;

      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (props.readonly) {
        return;
      }

      touch.start(event);

      if (moving) {
        const translateY = getElementTranslateY(wrapper.value!);
        state.offset = Math.min(0, translateY - baseOffset());
        startOffset = state.offset;
      } else {
        startOffset = state.offset;
      }

      state.duration = 0;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (props.readonly) {
        return;
      }

      touch.move(event);

      if (touch.isVertical()) {
        moving = true;
        preventDefault(event, true);
      }

      state.offset = clamp(
        startOffset + touch.deltaY.value,
        -(count() * props.itemHeight),
        props.itemHeight
      );

      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
        touchStartTime = now;
        momentumOffset = state.offset;
      }
    };

    const onTouchEnd = () => {
      if (props.readonly) {
        return;
      }

      const distance = state.offset - momentumOffset;
      const durationTemp = Date.now() - touchStartTime;
      const allowMomentum =
        durationTemp < MOMENTUM_LIMIT_TIME &&
        Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        momentum(distance, durationTemp);
        return;
      }

      const index = getIndexByOffset(state.offset);
      state.duration = DEFAULT_DURATION;
      // setIndex(index, true);

      // compatible with desktop scenario
      // use setTimeout to skip the click event Emitted after touchstart
      setTimeout(() => {
        moving = false;
      }, 0);
    };

    const renderOptions = () => {
      const optionStyle = {
        height: `${props.itemHeight}px`,
      };

      return state.options.map((option, index: number) => {
        const text = getOptionText(option);
        const disabled = isOptionDisabled(option);

        const data = {
          role: 'button',
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: bem('item', {
            disabled,
            selected: isSelected(index),
          }),
          onClick: () => onClickItem(index),
        };

        const childData = {
          class: 'van-ellipsis',
          [props.allowHtml ? 'innerHTML' : 'textContent']: text,
        };

        let content;
        if (props.renderItem) {
          content = props.renderItem({ option, isSelected: isSelected(index) });
        } else {
          content = (slots.option ? slots.option(option) : <div {...childData} />);
        }

        return (
          <li {...data}>
            {content}
          </li>
        );
      });
    };

    const setValue = (value: string) => {
      // const { options } = state;
      for (let i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
    };

    const getValue = () => {
      // PickerOption => state.options[state.index]
      if (!props.multiple) {
          return state.options[state.currentIndex];
      }
      return state.currentIndex.map((index) => state.options[index]);
    };

    // 重置到初始配置项状态
    const reset = () => {
        state.options = deepClone(props.initialOptions);
        state.currentIndex = deepClone(props.defaultIndex);
    };

    setIndex(state.currentIndex);

    useParent(PICKER_KEY);
    useExpose({
      state,
      setIndex,
      getValue,
      setValue,
      setOptions,
      stopMomentum,
      reset,
    });

    watch(() => props.initialOptions, setOptions);

    watch(
      () => props.defaultIndex,
      (value) => {
        setIndex(value);
      }
    );

    return () => {
      const wrapperStyle = {
        transform: `translate3d(0, ${state.offset + baseOffset()}px, 0)`,
        transitionDuration: `${state.duration}ms`,
        transitionProperty: state.duration ? 'all' : 'none',
      };


      return (
        <div
          key={JSON.stringify(state.options)}
          class={[bem(), props.className]}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          <ul
            ref={wrapper}
            // style={wrapperStyle}
            class={bem('wrapper')}
          >
            {renderOptions()}
          </ul>
        </div>
      );
    };
  },
});
