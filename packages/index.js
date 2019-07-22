/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import Button from './button';
import Cell from './cell';
import CellGroup from './cell-group';
import Collapse from './collapse';
import CollapseItem from './collapse-item';
import Icon from './icon';
import Info from './info';
import Lazyload from './lazyload';
import Loading from './loading';
import Locale from './locale';
import NavBar from './nav-bar';
import Overlay from './overlay';
import Panel from './panel';
import Progress from './progress';
import Row from './row';
import Uploader from './uploader';

const version = '0.0.3';
const components = [
  Button,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Icon,
  Info,
  Loading,
  NavBar,
  Overlay,
  Panel,
  Progress,
  Row,
  Uploader
];

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  Button,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Icon,
  Info,
  Lazyload,
  Loading,
  Locale,
  NavBar,
  Overlay,
  Panel,
  Progress,
  Row,
  Uploader
};

export default {
  install,
  version
};
