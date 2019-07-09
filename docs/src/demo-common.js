/**
 * Demo Common Mixin && i18n
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import H5Doc, {
  DemoBlock,
  DemoSection
} from './components/H5Doc/index';
import i18n from './utils/i18n';
import H5, { Lazyload } from '../../packages';
import { camelize } from '../../packages/utils';

Vue
  .use(H5)
  .use(H5Doc)
  .use(VueRouter)
  .use(Lazyload, {
    lazyComponent: true
  });

Vue.mixin(i18n);
Vue.component('demo-block', DemoBlock);
Vue.component('demo-section', DemoSection);

export function wrapper(promise, name) {
  return promise.then(component => {
    component = component.default;
    name = 'demo-' + name;
    console.log('name:', name);
    component.name = name;
    return component;
  });
}
