import {
    createNamespace
} from '../utils';
import Info from '../info';
import isSrc from '../utils/validate/src';

const [createComponent] = createNamespace('icon');

function Icon(h, props, slots, ctx) {
    const urlIcon = isSrc(props.name);

    return (
        <i
            class={[
                props.classPrefix,
                urlIcon ? 'h5-icon--image' : `${props.classPrefix}-${props.name}`
            ]}
            style={{
                color: props.color,
                fontSize: props.size
            }}
            {...ctx.data}
        >
            {ctx.default && ctx.default()}
            {urlIcon && <img src={props.name} />}
            <Info info={props.info} />
        </i>
    );
}

Icon.props = {
    name: String,
    size: String,
    color: String,
    info: [String, Number],
    classPrefix: {
        type: String,
        default: 'h5-icon'
    }
};

export default createComponent(Icon);
