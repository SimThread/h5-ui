import NumberFormat from '../t-number-format';

declare const ga: any;

export interface MethodsConstructor {
    /**
     * 谷歌统计事件
     */
    ga(ec: string, ea:string, el:string): void,
    ga(action: string, eventType: string, ec: string, ea: string, el: string, description: string, count: number): void,
    /**
     * 添加前导0
     */
    addZero(num: number | string): string,
    /**
     * 千分符转换
     */
    thousands(str: string): string,
    [propName: string]: any;
}

const Methods: MethodsConstructor = {
    addZero: NumberFormat.addZero,
    thousands: NumberFormat.thousands,
    ga(...args:any) {
        if (typeof ga !== 'undefined') {
            if (args.length === 3) {
                const [ec, ea, el] = args;
                ga('send', 'event', ec, ea, el, 1);
            } else if (args.length === 7) {
                const [action, eventType, ec, ea, el, description, count] = args;
                ga(action, eventType, ec, ea, el, description, count);
            }
        }
    },
    install(Vue: any) {
        Vue.prototype.$h5 = {};
        Object.keys(Methods).forEach((method) => {
            Vue.prototype.$h5[method] = Methods[method];
        });
    }
};

export default Methods;
