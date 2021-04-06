/**
 * Demo Common Mixin && i18n
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-named-as-default
import H5Doc, {
    DemoBlock,
    DemoSection
} from './components/H5Doc/index';
import H5, { Lazyload } from '../../src';

Vue
    .use(H5)
    .use(H5Doc)
    .use(VueRouter)
    .use(Lazyload, {
        lazyComponent: true
    });

Vue.component('demo-block', DemoBlock);
Vue.component('demo-section', DemoSection);

export function wrapper(promise, name) {
    return promise.then(component => {
        component = component.default;
        component.name = `demo-${name}`;
        return component;
    });
}
