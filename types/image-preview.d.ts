import { H5PopupMixin } from './mixins/popup';

export type ImagePreviewOptions = string[] | {
  loop?: boolean;
  images: string[];
  className?: any;
  startPosition?: number;
  lazyLoad?: boolean;
  showIndex?: boolean;
  asyncClose?: boolean;
  showIndicators?: boolean;
  onClose?: () => any;
};

export class H5ImagePreview extends H5PopupMixin {
  images: string[];
  showIndex: boolean;
  startPosition: number;
}

export interface ImagePreview {
  (options: ImagePreviewOptions, startPosition?: number): H5ImagePreview;
  install(): void;
}

export const ImagePreview: ImagePreview;
