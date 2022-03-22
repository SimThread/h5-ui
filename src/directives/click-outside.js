export default {
  name: 'click-outside',
  // 初始化指令
  beforeMount(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      binding.value(e);
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutSide = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  updated() {},
  unmounted(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutSide);
    delete el.vueClickOutSide;
  },
};
