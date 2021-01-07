import ClickOutside from '../directives/click-outside';

ClickOutside.install = function(Vue) {
    console.log('npm 安装测试');
    Vue.directive(ClickOutside.name, ClickOutside);
};
export default ClickOutside;
