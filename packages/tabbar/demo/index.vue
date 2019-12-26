<template>
  <demo-section>
    <demo-block :title="$t('basicUsage')">
      <h5-tabbar v-model="active">
        <h5-tabbar-item icon="home-o">{{ $t('tab') }}</h5-tabbar-item>
        <h5-tabbar-item
          icon="search"
          dot
        >
          {{ $t('tab') }}
        </h5-tabbar-item>
        <h5-tabbar-item
          icon="friends-o"
          info="5"
        >
          {{ $t('tab') }}
        </h5-tabbar-item>
        <h5-tabbar-item
          icon="setting-o"
          info="20"
        >
          {{ $t('tab') }}
        </h5-tabbar-item>
      </h5-tabbar>
    </demo-block>

    <demo-block title="自定义图标">
      <h5-tabbar v-model="active2">
        <h5-tabbar-item info="3">
          <span>{{ $t('custom') }}</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon.active : icon.normal"
          >
        </h5-tabbar-item>
        <h5-tabbar-item icon="search">{{ $t('tab') }}</h5-tabbar-item>
        <h5-tabbar-item icon="setting-o">{{ $t('tab') }}</h5-tabbar-item>
      </h5-tabbar>
    </demo-block>

    <demo-block title="自定义颜色">
      <h5-tabbar
        v-model="active3"
        active-color="#07c160"
      >
        <h5-tabbar-item icon="home-o">{{ $t('tab') }}</h5-tabbar-item>
        <h5-tabbar-item icon="search">{{ $t('tab') }}</h5-tabbar-item>
        <h5-tabbar-item icon="friends-o">{{ $t('tab') }}</h5-tabbar-item>
        <h5-tabbar-item icon="setting-o">{{ $t('tab') }}</h5-tabbar-item>
      </h5-tabbar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            active2: 0,
            active3: 0,
            icon: {
                normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
                active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
            }
        };
    }
};
</script>

<style lang="less">
.demo-tabbar {
  .h5-tabbar {
    position: relative;

    &-item {
      cursor: pointer;
    }
  }
}
</style>
