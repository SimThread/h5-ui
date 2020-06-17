import NumberFormat from '../t-number-format';

const Methods = {};

function addMethod (object, name, fn) {
    // 先把原来的object[name] 方法，保存在old中
    const old = object[name];

    // 重新定义 object[name] 方法
    object[name] = function (...args) {
    // 如果函数需要的参数 和 实际传入的参数 的个数相同，就直接调用fn
        if (fn.length === args.length) {
            return fn.apply(this, args);

            // 如果不相同,判断old 是不是函数，
            // 如果是就调用old，也就是刚才保存的 object[name] 方法
        } if (typeof old === 'function') {
            return old.apply(this, args);
        }
    };
}

Methods.$thousands = NumberFormat.thousands;

addMethod(Methods, '$ga', (action = 'send', eventType = 'event', ec, ea, el, description, count = 1) => {
    if (typeof ga !== 'undefined') {
        // eslint-disable-next-line no-undef
        ga(action, eventType, ec, ea, el, description, count);
    }
});

addMethod(Methods, '$ga', (ec, ea, el) => {
    if (typeof ga !== 'undefined') {
        // eslint-disable-next-line no-undef
        ga('send', 'event', ec, ea, el, '', 1);
    }
});

Methods.install = function(Vue) {
    Vue.mixins({ methods: Methods });
};

export default Methods;
