import Vue from 'vue';
import VueRouter from 'vue-router';
import { camelize } from '../../packages/_utils/format/string';
import { get } from '../../packages/_utils';
import '../../packages/index.less';
import Locale from '../../packages/_locale';

import {
    progress
} from './components/H5Doc/index';
import App from './WapApp';
import routes from './router';

const {
    defineReactive
} = Vue.util;

defineReactive(Vue.prototype, '$active', window.localStorage.getItem('active') || 'zh-CN');

const routesArr = routes(true);
const router = new VueRouter({
    mode: 'hash',
    routes: routesArr,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    }
});

router.beforeEach((route, redirect, next) => {
    progress.start();
    next();
});

router.afterEach(() => {
    progress.done();
    if (!router.currentRoute.redirectedFrom) {
        Vue.nextTick(() => window.syncPath());
    }
});

window.vueRouter = router;

if (process.env.NODE_ENV !== 'production') {
    Vue.config.productionTip = false;
}

let demoUid = 0;

// helper for demo locales
Vue.mixin({
    computed: {
        t() {
            const { name } = this.$options;
            const { lang = 'zh-CN' } = (this.$route && this.$route.meta) || {};
            const prefix = name ? camelize(name) + '.' : '';
            const messages = this.$h5Messages[lang];

            return (path, ...args) => {
                const message = get(messages, prefix + path) || get(messages, path);
                return typeof message === 'function' ? message(...args) : message;
            };
        }
    },

    beforeCreate() {
        if (!this.$options.name) {
            this.$options.name = `demo-${demoUid++}`;
        }

        const { i18n, name } = this.$options;

        if (i18n && name) {
            const locales = {};
            const camelizedName = camelize(name);

            Object.keys(i18n).forEach(key => {
                locales[key] = { [camelizedName]: i18n[key] };
            });

            Locale.add(locales);
        }
    },
});

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
