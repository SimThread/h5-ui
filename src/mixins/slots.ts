/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
import { createApp } from 'vue';

export const SlotsMixin = createApp({
  methods: {
    slots(name = 'default', props: any) {
      const { $slots, $scopedSlots } = this;
      const scopedSlot = $scopedSlots[name];

      if (scopedSlot) {
        return scopedSlot(props);
      }

      return $slots[name];
    },
  },
});
