<template>
  <div class="demo-filter-area">
    <h5-business-filter-area
      v-model:active="activeIndex"
      :offset-top="46"
      sticky
    >
      <h5-business-filter-area-panel
        :title="area.title"
        :highlight="area.title !== '區域'"
        :delay-render="true"
      >
        <template #title> 區域 <h5-icon name="triangle-down" /> </template>
        <h5-business-select
          ref="areaSelect"
          :columns="area.options"
          @change="onChange"
          value-key="text"
          :render-item="renderItem"
        >
          <template #columns-bottom>
            <filter-footer @resetArea="resetArea" />
          </template>
        </h5-business-select>
      </h5-business-filter-area-panel>
      <h5-business-filter-area-panel>
        <template #title> 售價 <h5-icon name="triangle-down" /> </template>
        <div class="price-wrap">
          <div class="title"><span>每伙定價(萬）</span> 呎價(元）</div>
          <div class="tags-wrap sale-tags-wrap">
            <div class="tags sale-tags">
              <span class="tag">500萬以下</span>
              <span class="tag">500-1000萬</span>
              <span class="tag">1000—2000萬</span>
              <span class="tag">2000-3000萬</span>
              <span class="tag">3000万-4000萬</span>
              <span class="tag">4000萬以上</span>
            </div>
          </div>
          <div class="price-range">
            <div class="range-wrap range-start-wrap">
              <input type="text" value="20" class="text-input" />萬
            </div>
            <span>至</span>
            <div class="range-wrap range-end-wPrap">
              <input type="text" value="1098" class="text-input" />萬
            </div>
          </div>
        </div>
      </h5-business-filter-area-panel>
      <h5-business-filter-area-panel class="panel-area">
        <template #title> 面積 <h5-icon name="triangle-down" /> </template>
        <div>面積</div>
      </h5-business-filter-area-panel>
      <h5-business-filter-area-panel>
        <template #title> 更多 <h5-icon name="triangle-down" /> </template>
        <div class="more-wrap">
          <div class="sale-status">
            <div class="title">出售狀態</div>
            <div class="content">
              <div class="tags-wrap">
                <div class="tags">
                  <div class="tag">在售樓盤</div>
                  <div class="tag">待售樓盤</div>
                </div>
              </div>
            </div>
          </div>
          <div class="other">
            <div class="title">其他特色</div>
            <div class="content">
              <div class="tags-wrap">
                <div class="tags">
                  <div class="tag">視頻睇樓</div>
                  <div class="tag">售價折扣</div>
                  <div class="tag">近地鐵</div>
                  <div class="tag">洋房</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </h5-business-filter-area-panel>
      <h5-business-filter-area-panel class="sort-panel" :delay-render="true">
        <template #title><h5-icon name="paixu" /></template>
        <h5-business-select
          ref="areaSelect"
          :columns="sort.options"
          value-key="text"
        />
      </h5-business-filter-area-panel>
    </h5-business-filter-area>
  </div>
</template>

<script>
import data from './data';
import FilterFooter from './FilterFooter';

const areaId = data.area_data.area_id;
const areaDistrict = data.area_data.area_district;
const districtId = data.area_data.district_id;
const subwayLineData = data.traffic.subway_line_data;
const subwayStationData = data.traffic.subway_station_data;
const areaPrice = data.area_price;
const ageOfBuilding = data.age_of_building;
const params = {
  districtId: [],
  subwayStation: [],
};
const sortOptions = [
  { id: 0, text: '默認排序' },
  { id: 1, text: '樓齡新到舊' },
  { id: 2, text: '樓齡舊到新' },
  { id: 3, text: '呎價低到高' },
  { id: 4, text: '呎價低到高' },
];
const options = {
  areaOptions: [{ id: 0, type: 'area', text: '不限' }],
  subwayOptions: [],
};

const subOptions = {
  areaOptions: {},
  subwayOptions: {},
};

areaDistrict[0] = [];

Object.keys(districtId).forEach((key) => {
  areaDistrict[0].push(Number(key));
});

Object.keys(areaId).forEach((key) => {
  options.areaOptions.push({
    id: Number(key),
    type: 'area',
    text: areaId[key],
  });
});

Object.keys(subwayLineData).forEach((key) => {
  options.subwayOptions.push({
    id: Number(key),
    type: 'traffic',
    text: subwayLineData[key],
  });
});

Object.keys(areaDistrict).forEach((key) => {
  subOptions.areaOptions[key] = areaDistrict[key].map((item) => ({
    id: item,
    type: 'area',
    text: districtId[item],
  }));
});

Object.keys(subwayStationData).forEach((key) => {
  subOptions.subwayOptions[key] = subwayStationData[key].map((item) => ({
    id: item.id,
    type: 'traffic',
    text: item.name,
  }));
});

function toQueryPair(key, value) {
  if (typeof value === 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}
function toQueryString(obj) {
  let ret = [];
  Object.keys(obj).forEach((key) => {
    key = encodeURIComponent(key);
    const values = obj[key];
    if (values && values.constructor === Array) {
      // 数组
      const queryValues = [];
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else {
      // 字符串
      ret.push(toQueryPair(key, values));
    }
  });
  return ret.join('&');
}

const areaColumns = [
  {
    values: [...options.areaOptions],
    className: 'column1',
    defaultIndex: -1,
  },
  {
    values: [
      {
        id: -1,
        text: '不限',
        type: 'district',
        selectAll: true,
      },
      ...subOptions.areaOptions[options.areaOptions[0].id],
    ],
    className: 'column2',
    defaultIndex: [],
    multiple: true,
    checkStyle: 'checkbox',
  },
];

export default {
  components: {
    FilterFooter,
  },
  data() {
    return {
      activeIndex: -1,
      area: {
        title: '區域',
        select: null,
        options: areaColumns,
      },
      price: {
        title: '呎價',
        select: null,
        options: areaPrice,
      },
      age: {
        title: '樓齡',
        select: null,
        options: ageOfBuilding,
      },
      sort: {
        title: '排序',
        select: null,
        options: sortOptions,
      },
      showAddressSelect: false,

      minPrice: '',
      maxPrice: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.areaSelect &&
        this.$refs.areaSelect.setColumnValues(
          1,
          subOptions.areaOptions[options.areaOptions[0].id]
        );
    });
  },
  methods: {
    renderItem({ option, isSelected }) {
      if (isSelected) {
        return (
          <div>
            {option.text}
            <h5-icon name="success"></h5-icon>
          </div>
        );
      }
      return <div>{option.text}</div>;
    },
    complete() {
      this.activeIndex = -1;
    },
    // 区域重置
    resetArea() {
      delete params.areaId;
      delete params.districtId;
      delete params.subwayLine;
      delete params.subwayStation;

      this.$refs.areaSelect.reset(0);
      this.$refs.areaSelect.reset(1);
      this.$refs.areaSelect.reset(2);
      this.updateTitle(this.area, '區域');
      this.updateURL();
    },
    // 更新路由
    updateURL() {
      const beforeHref = window.location.href.slice(
        0,
        window.location.href.indexOf('html') + 4
      );
      const afterHref = window.location.href.slice(
        window.location.href.indexOf('#')
      );
      window.history.replaceState(
        null,
        null,
        `${beforeHref}?${toQueryString(params)}${afterHref}`
      );
    },
    // 更新标题
    updateTitle(target, title) {
      target.title = title;
    },
    // 區域選擇
    onChange(values, index) {
      if (index === 0) {
        this.$refs.areaSelect.setColumnValues(
          1,
          subOptions.areaOptions[values[0].id]
        );
      }
    },
    onPriceChange(picker, values, index) {
      if (values.value === 0) {
        delete params.areaPrice;
        this.updateTitle(this.price, '尺價');
      } else {
        params.areaPrice = values.value.join(',');
        this.updateTitle(this.price, values.text);
      }
      this.updateURL();
    },
    onAgeChange(picker, values, index) {
      if (values.value === 0) {
        delete params.ageOfBuildingSearch;
        this.updateTitle(this.age, '樓齡');
      } else {
        params.ageOfBuildingSearch = values.value;
        this.updateTitle(this.age, values.text);
      }
      this.updateURL();
    },
    onSortChange(picker, values, index) {
      if (values.id === 0) {
        delete params.sort;
        this.updateTitle(this.sort, '排序');
      } else {
        params.sort = values.id;
        this.updateTitle(this.sort, values.text);
      }
      this.updateURL();
    },
    onPriceConfirm(minPrice, maxPrice) {
      this.$refs.priceSelect.setColumnIndex(0, -1);
      minPrice = Number.parseInt(minPrice.trim(), 10) || 0;
      maxPrice = Number.parseInt(maxPrice.trim(), 10) || 200000000;

      params.areaPrice = `${minPrice},${maxPrice}`;

      if (!minPrice && maxPrice === 200000000) {
        delete params.areaPrice;
        this.updateTitle(this.price, '尺價');
      } else {
        this.updateTitle(this.price, `${minPrice}-${maxPrice}元`);
        if (!minPrice) {
          this.updateTitle(this.price, `${maxPrice}元以下`);
        } else if (maxPrice === 200000000) {
          this.updateTitle(this.price, `${minPrice}元以上`);
        } else {
          this.updateTitle(this.price, `${minPrice}-${maxPrice}元`);
        }
      }
      this.updateURL();
    },
  },
};
</script>

<style lang="less">
// @import '../../style/reset';
// @import '../../style/var';

.demo-filter-area {
  height: 2000px;

  .panel-area {
    padding: 10px;
  }

  .price-footer {
    padding: 5px 10px;

    .min-price,
    .max-price {
      padding: 5px;
      line-height: 20px;
      width: 70px;
      height: 30px;
      display: inline-block;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .btn {
      vertical-align: top;
      background-color: #f60;
      border-color: #f60;
      color: #fff;
      height: 30px;
      line-height: 1.5;
      padding: 3px 15px;
      font-size: 15px;
      display: inline-block;
      border-radius: 5px;
    }
  }

  // 排序
  .h5-business-filter-area__title:nth-child(5) {
    flex: 0 1 auto;
    width: 30px;
  }

  // 第二栏
  .h5-business-select-column:nth-child(2) {
    flex: 0 1 auto;
    width: 66.66%;
  }

  .h5-business-filter-area-panel .van-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .tags-wrap {
    .tags {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 10px;
      row-gap: 10px;
      .tag {
        // width: 100px;
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        color: #333;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  .price-wrap {
    padding: 0 15px;
    min-height: 280px;
    .title {
      font-size: 16px;
      padding-top: 20px;
      color: #333;
      text-align: center;
      span {
        font-weight: 500;
      }
    }
    .sale-tags-wrap {
      margin-top: 20px;
    }
    .price-range {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        padding: 0 20px;
      }
      .range-wrap {
        display: inline-flex;
        align-items: center;
        width: 90px;
        height: 30px;
        font-size: 14px;
        border: 1px solid #e6e6e6;
        .text-input {
          height: 16px;
          line-height: 16px;
          width: 70px;
          font-size: 16px;
          border: none;
          outline: none;
          text-align: center;
          font-weight: bold;
          padding: 0 5px;
          box-sizing: border-box;
        }
      }
    }
  }

  .more-wrap {
    padding: 0 15px;
    .tags-wrap {
      margin-top: 20px;
    }
    .sale-status {
      padding-top: 20px;
    }
    .other {
      padding-top: 30px;
    }
  }
}
</style>
