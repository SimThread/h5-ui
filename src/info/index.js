import {
    createNamespace,
    isDef
} from '../utils';

const [createComponent, bem] = createNamespace('info');

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

export default createComponent(Info);
