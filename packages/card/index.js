import { use, isDef } from '../_utils';
import Tag from '../tag';

const [sfc, bem] = use('card');

export default sfc({
  props: {
    tag: String,
    desc: String,
    thumb: String,
    title: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    num: [Number, String],
    price: [Number, String],
    originPrice: [Number, String],
    currency: {
      type: String,
      default: '¥'
    }
  },

  render(h) {
    const { thumb, slots } = this;

    const showThumb = slots('thumb') || thumb;
    const showMask = slots('mask') || this.tag;
    const Title = slots('title') || (this.title && <div class={bem('title')}>{this.title}</div>);

    const Thumb = showThumb && (
      <a href={this.thumbLink} class={bem('thumb')}>
        {slots('thumb') ||
          (this.lazyLoad ? (
            <img class={bem('img')} vLazy={thumb} />
          ) : (
            <img class={bem('img')} src={thumb} />
          ))}
        {showMask && (
          <div class={bem('mask')}>
            {slots('mask') || (
              <Tag mark type="danger">
                {this.tag}
              </Tag>
            )}
          </div>
        )}
      </a>
    );

    return (
      <div class={bem()}>
        <div class={bem('header')}>
          {Thumb}
          <div class={bem('content', { centered: this.centered })}>
            {Title}
              1232321
          </div>
        </div>
      </div>
    );
  }
});
