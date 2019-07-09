<template>
  <demo-section>
    <demo-block :title="$t('basicUsage')">
      <h5-nav-bar
        :title="$t('title')"
        :left-text="$t('back')"
        :right-text="$t('button')"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>

    <demo-block :title="$t('advancedUsage')">
      <h5-nav-bar
        :title="$t('title')"
        :left-text="$t('back')"
        left-arrow
      >
        <h5-icon
          name="search"
          slot="right"
        />
      </h5-nav-bar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$toast(this.$t('back'));
    },
    onClickRight() {
      this.$toast(this.$t('button'));
    }
  }
};
</script>
