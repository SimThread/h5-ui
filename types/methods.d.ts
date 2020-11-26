import Vue from 'vue';

import { MethodsConstructor } from '../src/methods/index';

declare module 'vue/types/vue' {
  interface Vue {
    $h5: MethodsConstructor
  }
}

export const Methods: MethodsConstructor;
