/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Vue, { PluginFunction } from 'vue';

export interface Lazyload {
  install: PluginFunction<void>
}

export const Lazyload: Lazyload;
