import Anchor from '../directives/anchor';

Anchor.install = function(Vue) {
    Vue.directive(Anchor.name, Anchor);
};
export default Anchor;
