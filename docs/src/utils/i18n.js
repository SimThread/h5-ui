// component mixin
import { get, camelize } from '../../../packages/utils';

export default {
    computed: {
        $t() {
            const { name } = this.$options;
            const prefix = name ? camelize(name) + '.' : '';

            if (!this.$h5Messages) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('[Vant] Locale not correctly registered');
                }
                return () => '';
            }

            const messages = this.$h5Messages[this.$h5Lang];
            return (path, ...args) => {
                const message = get(messages, prefix + path) || get(messages, path);
                return typeof message === 'function' ? message(...args) : message;
            };
        }
    }
};
