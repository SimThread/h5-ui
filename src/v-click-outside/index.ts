import _ClickOutside from '../directives/click-outside';

_ClickOutside.install = function (app) {
  app.directive(_ClickOutside.name, _ClickOutside);
};
export const ClickOutside = _ClickOutside;
export default ClickOutside;
