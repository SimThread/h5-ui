import Vue from 'vue';
import { deepAssign } from '../_utils/deep-assign';
import defaultMessages from './lang/zh-CN';

declare module 'vue' {
  interface VueConstructor {
    util: {
      defineReactive(obj: object, key: string, value: any): void;
    };
  }
}

const proto = Vue.prototype;
const { defineReactive } = Vue.util;

defineReactive(proto, '$active', 'zh-CN');
defineReactive(proto, '$h5Messages', {
    'zh-CN': defaultMessages,
});

export default {
    messages() {
        return proto.$h5Messages[proto.$active];
    },

    use(lang: string, messages?: object) {
        proto.$active = lang;
        this.add({ [lang]: messages });
    },

    add(messages = {}) {
        deepAssign(proto.$h5Messages, messages);
    },
};
