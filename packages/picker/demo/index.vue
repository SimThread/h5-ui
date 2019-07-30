<template>
  <demo-section>
    <demo-block title="基础用法">
      <h5-picker
        :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
        @change="onChange1"
      />
    </demo-block>

    <demo-block title="禁用选项">
      <h5-picker :columns="[
        { text: '杭州', disabled: true },
        { text: '宁波' },
        { text: '温州' }
      ]" />
    </demo-block>

    <demo-block title="展示顶部栏">
      <h5-picker
        show-toolbar
        title="标题"
        :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </demo-block>

    <demo-block title="多列联动">
      <h5-picker
        :columns="columns"
        @change="onChange2"
      />
    </demo-block>

    <demo-block title="加载状态">
      <h5-picker
        loading
        :columns="columns"
      />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  computed: {
    columns() {
      const column = {
        浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        福建: ['福州', '厦门', '莆田', '三明', '泉州']
      };
      return [
        {
          values: Object.keys(column),
          className: 'column1'
        },
        {
          values: column[Object.keys(column)[0]],
          className: 'column2',
          defaultIndex: 2
        }
      ];
    }
  },

  methods: {
    onChange1(picker, value, index) {
      this.$toast((value, index) => `Value: ${value}, Index：${index}`, value, index);
    },
    onChange2(picker, values) {
      picker.setColumnValues(1, {
        浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        福建: ['福州', '厦门', '莆田', '三明', '泉州']
      }[values[0]]);
    },
    onConfirm(value, index) {
      this.$toast((value, index) => `Value: ${value}, Index：${index}`, value, index);
    },
    onCancel() {
      this.$toast('取消');
    }
  }
};
</script>
