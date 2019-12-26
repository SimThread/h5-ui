<template>
  <demo-section>
    <demo-block title="基础用法">
      <h5-button @click="show1 = true">弹出 Popup</h5-button>
      <h5-popup v-model="show1">内容</h5-popup>
    </demo-block>

    <demo-block title="弹出位置">
      <h5-button @click="show2 = true;">底部弹出</h5-button>

      <h5-popup
        v-model="show2"
        position="bottom"
      >
        <h5-picker
          show-toolbar
          :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
          @confirm="show2 = false"
          @cancel="show2 = false"
        />
      </h5-popup>

      <h5-button @click="show3 = true">顶部弹出</h5-button>
      <h5-popup
        v-model="show3"
        position="top"
        :overlay="false"
      >
        内容
      </h5-popup>

      <h5-button @click="show4 = true">右侧弹出</h5-button>
      <h5-popup
        v-model="show4"
        position="right"
      >
        <h5-button @click="show4 = false">关闭弹层</h5-button>
        <h5-button @click="show5 = true">右侧弹出</h5-button>
        <h5-popup
          v-model="show5"
          position="right"
        >
          <h5-button @click="show5 = false">关闭弹层</h5-button>
        </h5-popup>
      </h5-popup>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false
        };
    },

    watch: {
        show3(val) {
            if (val) {
                setTimeout(() => {
                    this.show3 = false;
                }, 2000);
            }
        }
    },

    methods: {
        showDialog() {
            this.$dialog.confirm({
                title: 'confirm标题',
                message: '弹窗提示文字，左右始终距离边20PX，上下距离20PX，文字左对齐。弹窗提示文字，左右始终距离边20PX，上下距离20PX，文字左对齐。'
            });
        }
    }
};
</script>

<style lang="less">
@import '../../packages/_style/var';

.demo-popup {
  .h5-button {
    margin: 10px 0 10px 15px;
  }

  .h5-popup {
    width: 60%;
    padding: 20px;
    box-sizing: border-box;

    &--bottom {
      width: 100%;
      padding: 0;
      border-radius: 0;
    }

    .h5-tabs__content {
      height: 156px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .h5-tab__pane:not(:first-child) {
      padding: 10px;
      line-height: 1.4;
      color: @gray-darker;
    }

    &--top {
      color: @white;
      width: 100%;
      border-radius: 0;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.8);
    }

    &--left,
    &--right {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
