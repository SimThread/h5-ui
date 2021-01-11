import ClickOutside from '../directives/click-outside';

ClickOutside.install = function(Vue) {
    Vue.directive(ClickOutside.name, ClickOutside);
};
export default ClickOutside;
