import { withInstall } from '../utils';
import _Tabs, { TabsProps } from './Tabs';
import './index.less';

export const Tabs = withInstall(_Tabs);
export default Tabs;
export type { TabsProps };
export type { TabsType, TabsInstance } from './types';
