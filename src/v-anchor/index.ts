import _Anchor from '../directives/anchor';

_Anchor.install = function (app) {
  app.directive(_Anchor.name, _Anchor);
  return _Anchor;
};

export const Anchor = _Anchor;
export default Anchor;
