import {
  use,
  isDef
} from '../_utils';

const [sfc, bem] = use('info');

function Info(h, props, slots, ctx) {
  return (
    isDef(props.info) && (
      <div class={bem()} {...ctx.data}>
        {props.info}
      </div>
    )
  );
}

Info.props = {
  info: [String, Number]
};

export default sfc(Info);
