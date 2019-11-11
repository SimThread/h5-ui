/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import Anchor from './anchor';
import Button from './button';
import Card from './card';
import Cell from './cell';
import CellGroup from './cell-group';
import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';
import ClickOutside from './click-outside';
import Col from './col';
import Collapse from './collapse';
import CollapseItem from './collapse-item';
import Dialog from './dialog';
import Field from './field';
import FilterArea from './filter-area';
import FilterAreaPanel from './filter-area-panel';
import Icon from './icon';
import Info from './info';
import Lazyload from './lazyload';
import Loading from './loading';
import NavBar from './nav-bar';
import Overlay from './overlay';
import Panel from './panel';
import Picker from './picker';
import Popup from './popup';
import Progress from './progress';
import Row from './row';
import Select from './select';
import SharePopup from './share-popup';
import SharePopupItem from './share-popup-item';
import Tab from './tab';
import Tabbar from './tabbar';
import TabbarItem from './tabbar-item';
import Tabs from './tabs';
import Tag from './tag';
import Toast from './toast';
import ToolBom from './tool-bom';
import ToolDate from './tool-date';
import ToolDom from './tool-dom';
import ToolNumberFormat from './tool-number-format';
import ToolUrl from './tool-url';
import Uploader from './uploader';

const version = '0.0.14-beta';
const components = [
  Anchor,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  ClickOutside,
  Col,
  Collapse,
  CollapseItem,
  Dialog,
  Field,
  FilterArea,
  FilterAreaPanel,
  Icon,
  Info,
  Loading,
  NavBar,
  Overlay,
  Panel,
  Picker,
  Popup,
  Progress,
  Row,
  Select,
  SharePopup,
  SharePopupItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  Toast,
  ToolBom,
  ToolDate,
  ToolDom,
  ToolNumberFormat,
  ToolUrl,
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
  Anchor,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  ClickOutside,
  Col,
  Collapse,
  CollapseItem,
  Dialog,
  Field,
  FilterArea,
  FilterAreaPanel,
  Icon,
  Info,
  Lazyload,
  Loading,
  NavBar,
  Overlay,
  Panel,
  Picker,
  Popup,
  Progress,
  Row,
  Select,
  SharePopup,
  SharePopupItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  Toast,
  ToolBom,
  ToolDate,
  ToolDom,
  ToolNumberFormat,
  ToolUrl,
  Uploader
};

export default {
  install,
  version
};
