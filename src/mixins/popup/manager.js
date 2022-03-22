import { createApp } from 'vue';
import context from './context';
import Overlay from '../../overlay';

const defaultConfig = {
  className: '',
  customStyle: {},
};

export default {
  open(vm, config) {
    /* istanbul ignore next */
    // 如果context.stack中不存在传递进来的vm，则放进context.stack, 然后更新蒙版配置
    if (!context.stack.some((item) => item.vm === vm)) {
      const el = vm.$el;
      const target = el && el.parentNode ? el.parentNode : document.body;
      context.stack.push({ vm, config, target });
      this.update();
    }
  },

  close(vm) {
    const { stack } = context;

    if (stack.length) {
      if (context.top.vm === vm) {
        stack.pop();
        this.update();
      } else {
        context.stack = stack.filter((item) => item.vm !== vm);
      }
    }
  },

  update() {
    let { modal } = context;

    if (!modal) {
      // modal继承overlay对象，其中overlay也是Vue对象
      modal = new (createApp(Overlay))({
        el: document.createElement('div'),
      });
      modal.$on('click', this.onClick);

      context.modal = modal;
    }
    // 如果蒙版有父节点，则关闭弹窗
    if (modal.$el.parentNode) {
      modal.visible = false;
    }

    // 开启弹窗
    if (context.top) {
      const { target, config } = context.top;
      // 把蒙版插入到和弹窗同层位置
      target.appendChild(modal.$el);
      Object.assign(modal, defaultConfig, config, {
        visible: true,
      });
    }
  },

  // close popup when click modal && closeOnClickOverlay is true
  onClick() {
    /* istanbul ignore else */
    if (context.top) {
      const { vm } = context.top;
      vm.$emit('click-overlay');

      if (vm.closeOnClickOverlay) {
        // 针对Dialog做的扩展
        if (vm.onClickOverlay) {
          vm.onClickOverlay();
        } else {
          vm.close();
        }
      }
    }
  },
};
