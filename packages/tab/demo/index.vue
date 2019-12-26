<template>
  <demo-section>
    <demo-block title="基础用法">
      <h5-tabs v-model="active">
        <h5-tab
          :title="'标签' + index"
          v-for="index in tabs"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="横向滚动">
      <h5-tabs @scroll="onScroll">
        <h5-tab
          v-for="index in 8"
          :title="'标签' + index"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="禁用标签">
      <h5-tabs @disabled="onClickDisabled">
        <h5-tab
          v-for="index in 3"
          :title="'标签' + index"
          :disabled="index === 2"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="样式风格">
      <h5-tabs type="card">
        <h5-tab
          v-for="index in 3"
          :title="'标签' + index"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="点击事件">
      <h5-tabs @click="onClick">
        <h5-tab
          v-for="index in 2"
          :title="'标签' + index"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="粘性布局">
      <h5-tabs
        :active="active"
        sticky
      >
        <h5-tab
          :title="'标签' + index"
          v-for="index in tabs"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="自定义标签">
      <h5-tabs :active="active">
        <h5-tab
          v-for="index in 2"
          :key="index"
        >
          <div slot="title">
            <h5-icon name="more-o" />{{ '标签' }}
          </div>
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="切换动画">
      <h5-tabs
        animated
      >
        <h5-tab
          :title="'标签' + index"
          v-for="index in tabs"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>

    <demo-block title="滑动切换">
      <h5-tabs
        :active="active"
        swipeable
      >
        <h5-tab
          :title="'标签' + index"
          v-for="index in tabs"
          :key="index"
        >
          内容 {{ index }}
        </h5-tab>
      </h5-tabs>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
    data() {
        return {
            active: 2,
            tabs: [1, 2, 3, 4]
        };
    },

    methods: {
        onClickDisabled(index, title) {
            this.$toast(title + ' 已被禁用');
        },

        onClick(index, title) {
            this.$toast(title);
        },

        onScroll(e) {
            console.log(e);
        }
    }
};
</script>

<style lang="less">
@import '../../packages/_style/var';

.demo-tab {
  margin-bottom: 300px;

  .h5-tab .van-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .h5-tab__pane {
    background-color: @white;
    padding: 20px;
  }

  .h5-tabs--card .h5-tab__pane {
    background-color: transparent;
  }

  .custom-tabwrap .h5-tab-active {
    color: #20a0ff;
  }

  .custom-tabwrap .h5-tabs-nav-bar {
    background: #20a0ff;
  }

  .custom-pane {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .van-doc-demo-block:last-child {
    .h5-tab__pane {
      padding: 50px 20px;
    }
  }
}
</style>
