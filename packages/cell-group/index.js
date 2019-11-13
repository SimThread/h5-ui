import {
  use
} from '../_utils';

const [sfc, bem] = use('cell-group');

function CellGroup(h, props, slots, ctx) {
  return (
    <div
      class={[bem(), { 'h5-hairline--top-bottom': props.border }]}
      {...ctx.data}
    >
      {slots.default && slots.default()}
    </div>
  );
}

CellGroup.props = {
  border: {
    type: Boolean,
    default: true
  }
};

export default sfc(CellGroup);
