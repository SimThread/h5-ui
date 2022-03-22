import { withInstall } from '../utils';
import _Picker, { PickerProps } from './Picker';
import './index.less';

export const Picker = withInstall(_Picker);
export default Picker;
export type { PickerProps };
export type {
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerFieldNames,
  PickerObjectColumn,
  PickerObjectOption,
  PickerToolbarPosition,
} from './types';
