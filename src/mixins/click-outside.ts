/**
 * Listen to click outside event
 */
import { createApp } from 'vue';
import { on, off } from '../utils/dom/event';

export type ClickOutsideMixinConfig = {
  event: string;
  method: string;
};

export const ClickOutsideMixin = (config: ClickOutsideMixinConfig) =>
  createApp({
    props: {
      closeOnClickOutside: {
        type: Boolean,
        default: true,
      },
    },

    data() {
      const clickOutsideHandler = (event: Event) => {
        if (
          this.closeOnClickOutside &&
          !this.$el.contains(event.target as Node)
        ) {
          (this as any)[config.method]();
        }
      };

      return { clickOutsideHandler };
    },

    mounted() {
      on(document, config.event, this.clickOutsideHandler);
    },

    beforeUnmount() {
      off(document, config.event, this.clickOutsideHandler);
    },
  });
