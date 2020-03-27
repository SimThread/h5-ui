import {
    createNamespace
} from '../_utils/index';
import {
    emit,
    inherit
} from '../_utils/functional';
import Loading from '../loading';

const [createComponent, bem] = createNamespace('button');

function Button(h, props, slots, ctx) {
    const { type, disabled, loading, loadingText } = props;

    const onClick = event => {
        if (!loading && !disabled) {
            emit(ctx, 'click', event);
        }
    };

    return (
        <props.tag
            type={props.nativeType}
            disabled={disabled}
            class={bem([
                type,
                props.size,
                {
                    loading,
                    disabled,
                    block: props.block,
                    plain: props.plain,
                    round: props.round,
                    square: props.square,
                    'bottom-action': props.bottomAction
                }
            ])}
            onClick={onClick}
            {...inherit(ctx)}
        >
            {loading ? (
                [
                    <Loading size="20px" color={type === 'default' ? undefined : ''} />,
                    loadingText && <span class={bem('loading-text')}>{loadingText}</span>
                ]
            ) : (
                <span class={bem('text')}>
                    {slots.default ? slots.default() : props.text}
                </span>
            )}
        </props.tag>
    );
}

Button.props = {
    text: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    nativeType: String,
    loadingText: String,
    bottomAction: Boolean,
    tag: {
        type: String,
        default: 'button'
    },
    type: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'normal'
    }
};

export default createComponent(Button);
