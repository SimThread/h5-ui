import { ref } from 'vue';

export const useTabs = function () {
  const tabs = ref([]);
  return {
    tabs,
  };
};
