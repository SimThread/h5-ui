import Vue from 'vue';
import { H5PopupMixin } from './mixins/popup';

type ToastMessage = string | number;

export type ToastOptions = {
  type?: string;
  mask?: boolean;
  position?: string;
  duration?: number;
  className?: any;
  forbidClick?: boolean;
  loadingType?: string;
  message?: ToastMessage;
}

export interface H5Toast extends Vue, H5PopupMixin {
  type: string;
  position: string;
  loadingType: string;
  forbidClick: boolean;
  message: ToastMessage;
  clear(): void;
}

export interface Toast {
  (message: ToastOptions | ToastMessage, options?: ToastOptions): H5Toast;
  loading(options?: ToastOptions | ToastMessage): H5Toast;
  success(options?: ToastOptions | ToastMessage): H5Toast;
  fail(options?: ToastOptions | ToastMessage): H5Toast;
  clear(): void;
  install(): void;
  setDefaultOptions(options: ToastOptions): void;
  resetDefaultOptions(): void;
  allowMultiple(allow: boolean): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

export const Toast: Toast;
