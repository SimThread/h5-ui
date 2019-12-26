<template>
  <demo-section>
    <demo-block title="消息提示">
      <h5-button
        type="primary"
        plain
        @click="onClickAlert"
      >
        消息提示
      </h5-button>
      <h5-button
        type="primary"
        plain
        @click="onClickAlert2"
      >
        无标题提示
      </h5-button>
    </demo-block>

    <demo-block title="消息确认">
      <h5-button
        type="primary"
        plain
        @click="onClickConfirm"
      >
        消息确认
      </h5-button>
    </demo-block>

    <demo-block title="高级用法">
      <h5-button
        type="danger"
        plain
        @click="show = true"
      >
        高级用法
      </h5-button>
      <h5-dialog
        v-model="show"
        show-cancel-button
        :lazy-render="false"
        :before-close="beforeClose"
      >
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </h5-dialog>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            username: '',
            password: ''
        };
    },

    methods: {
        onClickAlert() {
            this.$dialog.alert({
                title: '标题',
                message: 'XX是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者'
            });
        },

        onClickAlert2() {
            this.$dialog.alert({
                message: 'XX是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者'
            });
        },

        onClickConfirm() {
            this.$dialog.confirm({
                title: '标题',
                message: 'XX是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者'
            });
        },

        beforeClose(action, done) {
            if (action === 'confirm') {
                setTimeout(done, 1000);
            } else {
                done();
            }
        }
    }
};
</script>

<style lang="less">
.demo-dialog {
  .van-doc-demo-block > .h5-button {
    margin-left: 15px;
  }
}
</style>
