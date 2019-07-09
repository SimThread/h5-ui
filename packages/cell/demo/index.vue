<template>
  <demo-section>
    <demo-block :title="$t('basicUsage')">
      <h5-cell-group>
        <h5-cell
          :title="$t('cell')"
          :value="$t('content')"
        />
        <h5-cell
          :title="$t('cell')"
          :value="$t('content')"
          :label="$t('desc')"
        />
      </h5-cell-group>
    </demo-block>

    <demo-block :title="$t('largeSize')">
      <h5-cell
        :title="$t('cell')"
        :value="$t('content')"
        size="large"
      />
      <h5-cell
        :title="$t('cell')"
        :value="$t('content')"
        size="large"
        :label="$t('desc')"
      />
    </demo-block>

    <demo-block :title="$t('showIcon')">
      <h5-cell
        :title="$t('cell')"
        :value="$t('content')"
        icon="location-o"
      />
    </demo-block>

    <demo-block :title="$t('valueOnly')">
      <h5-cell :value="$t('content')" />
    </demo-block>

    <demo-block :title="$t('showArrow')">
      <h5-cell
        :title="$t('cell')"
        is-link
      />
      <h5-cell
        :title="$t('cell')"
        is-link
        :value="$t('content')"
      />
      <h5-cell
        :title="$t('cell')"
        is-link
        arrow-direction="down"
        :value="$t('content')"
      />
    </demo-block>

    <demo-block :title="$t('router')">
      <h5-cell
        :title="$t('cell')"
        is-link
        url="//youzan.github.io/vant/mobile.html"
      />
      <h5-cell
        :title="$t('cell')"
        is-link
        to="index"
      />
    </demo-block>

    <demo-block :title="$t('advancedUsage')">
      <h5-cell
        :value="$t('content')"
        icon="shop-o"
        is-link
      >
        <template slot="title">
          <span class="custom-text">{{ $t('cell') }}</span>
          <h5-tag type="danger">{{ $t('tag') }}</h5-tag>
        </template>
      </h5-cell>
      <h5-cell
        :title="$t('cell')"
        icon="location-o"
        is-link
      />
      <h5-cell :title="$t('cell')">
        <h5-icon
          slot="right-icon"
          name="search"
          class="custom-icon"
        />
      </h5-cell>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      cell: '单元格',
      valueOnly: '只设置 value',
      showIcon: '展示图标',
      showArrow: '展示箭头',
      largeSize: '单元格大小',
      router: '页面跳转'
    },
    'en-US': {
      cell: 'Cell title',
      valueOnly: 'Value only',
      showIcon: 'Left Icon',
      showArrow: 'Link',
      largeSize: 'Size',
      router: 'Router'
    }
  }
};
</script>

<style lang="less">
.demo-cell {
  .custom-text {
    margin-right: 5px;
    vertical-align: middle;
  }

  .custom-icon {
    line-height: 24px;
  }
}
</style>
