<template>
  <demo-section>
    <demo-block title="基础用法">
      <h5-button @click="onTest()">弹出分享弹窗</h5-button>

      <h5-share-popup
        v-model="showSharePopup1"
        v-model:show-panel="showPanel1"
        panel-tip="長按拷貝下面鏈接，去貼上給好友吧："
        :panel-content="`1111<br/>2222`"
      >
        <h5-share-popup-item img-src="/images/Facebook.png" text="Facebook" />
        <h5-share-popup-item img-src="./images/WhatsApp.png" text="WhatsApp" />
        <h5-share-popup-item
          img-src="./images/Wechat.png"
          text="Wechat"
          @click="showPanel1 = true"
        />
        <h5-share-popup-item
          img-src="./images/copy.png"
          text="拷贝链接"
          @click="showPanel1 = true"
        />
      </h5-share-popup>
    </demo-block>

    <demo-block title="自定义pannel">
      <h5-button @click="showSharePopup2 = true">弹出自定义分享弹窗</h5-button>

      <h5-share-popup v-model="showSharePopup2" v-model:show-panel="showPanel2">
        <template #panel>
          <div
            style="
              position: absolute;
              top: 0;
              padding: 20px;
              width: 100%;
              height: 128px;
              background: #fff;
              box-sizing: border-box;
            "
          >
            自定义内容
          </div>
        </template>
        <h5-share-popup-item img-src="./images/Facebook.png" text="Facebook" />
        <h5-share-popup-item img-src="./images/WhatsApp.png" text="WhatsApp" />
        <h5-share-popup-item
          img-src="./images/Wechat.png"
          text="Wechat"
          @click="showPanel2 = true"
        />
        <h5-share-popup-item
          img-src="./images/copy.png"
          text="拷贝链接"
          @click="showPanel2 = true"
        />
      </h5-share-popup>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      showSharePopup1: false,
      showPanel1: false,
      showSharePopup2: false,
      showPanel2: false,
    };
  },
  methods: {
    onTest() {
      this.showSharePopup1 = true;
      console.log('onTest');
    },
  },
};
</script>

<style lang="less">
.demo-share-popup {
  padding: 0 5px;
  .h5-doc-demo-block {
    padding: 0 15px;
  }

  .h5-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 10px;
  }
}
</style>
