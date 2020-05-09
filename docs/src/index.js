import Vue from 'vue';
import VueRouter from 'vue-router';
import { H5Doc, progress } from './components/H5Doc/index';
import App from './DocsApp';
import routes from './router';
import { isMobile } from './utils';

// const {
//     defineReactive
// } = Vue.util;

// defineReactive(Vue.prototype, '$active', window.localStorage.getItem('active') || 'zh-CN');

Vue.use(VueRouter).use(H5Doc);

const routesArr = routes();
const router = new VueRouter({
    mode: 'hash',
    routes: routesArr
});

router.beforeEach((route, redirect, next) => {
    if (isMobile) {
        location.replace('mobile.html' + location.hash);
    }
    progress.start();
    document.title = route.meta.title || document.title;
    next();
});

router.afterEach(() => {
    progress.done();
    window.scrollTo(0, 0);
    Vue.nextTick(() => window.syncPath());
});

window.vueRouter = router;

if (process.env.NODE_ENV !== 'production') {
    Vue.config.productionTip = false;
}

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
