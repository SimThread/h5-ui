<template>
  <demo-section background="white">
    <demo-block title="基础用法">
      <h5-card
        num="2"
        price="2.00"
        desc="描述"
        title="10首付-買一層送一層"
        :thumb="imageURL"
      />
    </demo-block>

    <demo-block title="高级用法">
      <h5-card
        num="2"
        price="2.00"
        origin-price="10.00"
        tag="标签"
        desc="描述"
        title="10首付-買一層送一層"
        :thumb="imageURL"
      >
        <div
          slot="mask"
          class="card__mask">
          租金回报率3.83%
        </div>
      </h5-card>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      imageURL: '//p2.591.com.hk/estate/crop/2019/03/29/155382676533251509_212x160.jpg'
    };
  }
};
</script>

<style lang="less">
  .card__footer {
    padding-top: 10px;
  }

  .card__tags {
    .h5-tag {
      margin-right: 5px;
    }
  }
</style>
