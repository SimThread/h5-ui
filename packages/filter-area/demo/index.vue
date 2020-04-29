<template>
    <demo-section background="white">
        <demo-block title="基础用法">
            <h5-filter-area type="devision" v-model="activeIndex" :close-on-click-overlay="true" :sticky="true" :offset-top="30">
                <h5-filter-area-panel :immediate-render="true" :title="area.title" style="position: relative; z-index: 9999;" :highlight="(area.title !== '區域' && area.title !== '港鐵')">
                    <h5-select ref="areaSelect" :columns="area.options" @change="onChange" value-key="text">
                        <div slot="footer" class="estate-footer">
                            共找到<span class="count fc-org">12133</span>間房屋&nbsp;&nbsp;&nbsp;<span class="btn btn-warning" id="filterAreaSubmit" @click="complete()">完成</span> <span class="btn btn-link" id="resetArea" @click="resetArea()">重置</span>
                        </div>
                    </h5-select>
                </h5-filter-area-panel>

                <h5-filter-area-panel :immediate-render="true" :title="price.title" style="position: relative; z-index: 9999;" :highlight="price.title !== '呎價'">
                    <h5-select ref="priceSelect" :columns="price.options" value-key="text" @change="onPriceChange" :default-index="price.defaultIndex">
                        <div slot="footer" class="price-footer">
                            <input type="text" class="min-price" v-model="minPrice"> ~
                            <input type="text" class="max-price" v-model="maxPrice"> 元
                            <span class="btn" @click="onPriceConfirm(minPrice, maxPrice)">确定</span>
                        </div>
                    </h5-select>
                </h5-filter-area-panel>

                <h5-filter-area-panel :immediate-render="true" :title="age.title" style="position: relative; z-index: 9999;" :highlight="age.title !== '樓齡'">
                    <h5-select ref="ageSelect" :columns="age.options" @change="onAgeChange" />
                </h5-filter-area-panel>

                <h5-filter-area-panel :immediate-render="true" :title="sort.title" style="position: relative; z-index: 9999;" :highlight="sort.title !== '排序'">
                    <h5-select ref="sortSelect" :columns="sort.options" @change="onSortChange" />
                </h5-filter-area-panel>
            </h5-filter-area>
        </demo-block>
    </demo-section>
</template>

<script>
import data from './data';

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
        text: areaId[key]
    });
});

Object.keys(subwayLineData).forEach((key) => {
    options.subwayOptions.push({
        id: Number(key),
        type: 'traffic',
        text: subwayLineData[key]
    });
});

Object.keys(areaDistrict).forEach((key) => {
    subOptions.areaOptions[key] = areaDistrict[key].map((item) => ({
        id: item,
        type: 'area',
        text: districtId[item]
    }));
});

Object.keys(subwayStationData).forEach((key) => {
    subOptions.subwayOptions[key] = subwayStationData[key].map((item) => ({
        id: item.id,
        type: 'traffic',
        text: item.name
    }));
});

function toQueryPair(key, value) {
    if (typeof value == 'undefined') {
        return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}
function toQueryString(obj) {
    let ret = [];
    Object.keys(obj).forEach((key) => {
        key = encodeURIComponent(key);
        const values = obj[key];
        if (values && values.constructor == Array) { // 数组
            const queryValues = [];
            for (let i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        } else { // 字符串
            ret.push(toQueryPair(key, values));
        }
    });
    return ret.join('&');
}

function toQueryParams() {
    const search = this.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);// 提取location.search中'?'后面的部分
    if (!search) {
        return {};
    }
    const searchStr = search[1];
    const searchHash = searchStr.split('&');

    const ret = {};
    for (let i = 0, len = searchHash.length; i < len; i++) { // 这里可以调用each方法
        const pair = searchHash[i].split('=')[0];
        if (pair) {
            const key = decodeURIComponent(pair.shift());
            let value = pair.length > 1 ? pair.join('=') : pair[0];

            if (value != undefined) {
                value = decodeURIComponent(value);
            }
            if (key in ret) {
                if (ret[key].constructor != Array) {
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
    }
    return ret;
}

const areaColumns = [
    {
        values: [{ id: 'areaOptions', text: '區域' }, { id: 'subwayOptions', text: '港鐵' }],
        className: 'column1',
        defaultIndex: 0,
    },
    {
        values: [...options.areaOptions],
        className: 'column2',
        defaultIndex: -1,
    },
    {
        values: [],
        className: 'column3',
        defaultIndex: [],
        multiple: true,
    }
];

export default {
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
                options: ageOfBuilding
            },
            sort: {
                title: '排序',
                select: null,
                options: sortOptions
            },
            showAddressSelect: false,
            showOverlayer: false,
            imageURL: '//p2.591.com.hk/estate/crop/2019/03/29/155382676533251509_212x160.jpg',

            minPrice: '',
            maxPrice: '',
        };
    },
    computed: {
        valueCompute() {
            return this.activeIndex >= 0;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.area.select = this.$refs.areaSelect;
            this.price.select = this.$refs.priceSelect;
            this.age.select = this.$refs.ageSelect;
            this.sort.select = this.$refs.sortSelect;


            const queryPrams = toQueryParams.call(window.location.search);

            // 设置区域
            if (queryPrams.areaId) {
                this.area.select.setColumnIndex(0, 0);
                const index = options.areaOptions.findIndex((item) => Number(queryPrams.areaId) == item.id);
                this.area.select.setColumnValues(1, options.areaOptions);
                this.area.select.setColumnIndex(1, index);

                if (queryPrams.districtId) {
                    const districtId = queryPrams.districtId.split(',');
                    const districtDefaultIndex = districtId.map((id) => subOptions.areaOptions[queryPrams.areaId].findIndex((option) => Number(id) === option.id));
                    this.area.select.setColumnValues(2, subOptions.areaOptions[index]);
                    this.area.select.setColumnIndex(2, districtDefaultIndex);
                }
            } else if (queryPrams.subwayLine) {
                this.area.select.setColumnIndex(0, 1);
                const index = options.subwayOptions.findIndex((item) => Number(queryPrams.subwayLine) == item.id);
                this.area.select.setColumnValues(1, options.subwayOptions);
                this.area.select.setColumnIndex(1, index);

                if (queryPrams.subwayStation) {
                    const subwayStation = queryPrams.subwayStation.split(',');
                    const subwayStationDefaultIndex = subwayStation.map((id) => subOptions.subwayOptions[queryPrams.subwayLine].findIndex((option) => Number(id) === option.id));
                    // areaColumns[2].values = subOptions.subwayOptions[queryPrams.subwayLine];
                    // areaColumns[2].defaultIndex = subwayStationDefaultIndex;
                    this.area.select.setColumnValues(2, subOptions.subwayOptions[queryPrams.subwayLine]);
                    this.area.select.setColumnIndex(2, subwayStationDefaultIndex);
                }
            } else {
                this.area.select.setColumnValues(1, options.areaOptions);
                // areaColumns[1].values = options.areaOptions;
            }

            // 设置尺价
            if (queryPrams.areaPrice) {
                let isFind = false;

                areaPrice.forEach((item, index) => {
                    if (item.value && (item.value.join(',') == queryPrams.areaPrice)) {
                        isFind = true;
                        this.price.title = item.text;
                        this.price.select.setColumnIndex(0, index);
                        // 设置title
                        // this.priceTxt = item.txt;
                    }
                });

                if (!isFind) {
                    this.minPrice = queryPrams.areaPrice.split(',')[0] || '';
                    this.maxPrice = queryPrams.areaPrice.split(',')[1] == '200000000' ? '' : queryPrams.areaPrice.split(',')[1];

                    if (this.maxPrice) {
                        this.priceTxt = `${this.minPrice}元~${this.maxPrice}元`;
                    } else {
                        this.priceTxt = `${this.minPrice}元`;
                    }
                    this.price.select.setColumnIndex(0, -1);
                }
            }

            // 設置樓齡
            if (queryPrams.ageOfBuildingSearch) {
                const index = ageOfBuilding.findIndex((item) => item.value == queryPrams.ageOfBuildingSearch);
                this.age.select.setColumnIndex(0, index);
            }

            // 設置排序
            if (queryPrams.sort) {
                const index = sortOptions.findIndex((item) => item.id == queryPrams.sort);
                this.sort.select.setColumnIndex(0, index);
            }
        });
    },
    methods: {
        complete() {
            this.activeIndex = -1;
            this.showOverlayer = false;
        },
        // 区域重置
        resetArea() {
            delete params.areaId;
            delete params.districtId;
            delete params.subwayLine;
            delete params.subwayStation;

            this.area.select.reset(0);
            this.area.select.reset(1);
            this.area.select.reset(2);
            this.updateTitle(this.area, '區域');
            this.updateURL();
        },
        // 更新路由
        updateURL() {
            const beforeHref = window.location.href.slice(0, window.location.href.indexOf('html') + 4);
            const afterHref = window.location.href.slice(window.location.href.indexOf('#'));
            window.history.replaceState(null, null, `${beforeHref}?${toQueryString(params)}${afterHref}`);
        },
        // 更新标题
        updateTitle(target, title) {
            target.title = title;
        },
        onChange(picker, values, index) {
            if (index === 0) {
                picker.setColumnValues(1, options[values[0].id]);
                picker.setColumnValues(2, []);

                if (values[0].id === 'subwayOptions') {
                    this.updateTitle(this.area, '港鐵');
                    delete params.areaId;
                    delete params.districtId;
                } else {
                    this.updateTitle(this.area, '區域');
                    delete params.subwayLine;
                    delete params.subwayStation;
                }
            } else if (index === 1) {
                this.updateTitle(this.area, values[1].text);
                if (values[1].type === 'area') {
                    delete params.districtId;
                    params.areaId = values[1].id;
                    picker.setColumnValues(2, subOptions.areaOptions[values[1].id]);
                } else {
                    delete params.subwayStation;
                    params.subwayLine = values[1].id;
                    picker.setColumnValues(2, subOptions.subwayOptions[values[1].id]);
                }
            } else {
                const numStr = values[2].length > 0 ? `(${values[2].length})` : '';
                this.updateTitle(this.area, `${values[1].text}${numStr}`);
                if (values[2].length === 0) {
                    delete params.districtId;
                    delete params.subwayStation;
                } else if (values[2][0].type === 'area') {
                    params.districtId = values[2].map((item) => item.id).join(',');
                } else {
                    params.subwayStation = values[2].map((item) => item.id).join(',');
                }
            }

            this.updateURL();
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
            this.price.select.setColumnIndex(0, -1);
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
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../_style/reset';
@import '../../packages/_style/var';

.demo-filter-area {
    .estate-footer {
        width: 100%;
        padding: 7px 0;
        // position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        box-shadow: 0 -3px 3px 0 hsla(0, 0%, 60.8%, .4);
        // z-index: 21;
        background: #fff;

        .fc-org {
            color: #f60;
        }

        .btn {
            padding: 5px 15px;
            line-height: 1.42857143;
            border-radius: 4px;
        }

        .btn-warning {
            background-color: #f60;
            border-color: #f60;
            color: #fff;
        }

        .btn-link {
            color: #428bca;
            border-radius: 0;
        }
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

    .h5-filter-area-panel .van-icon {
        margin-right: 5px;
        vertical-align: -2px;
    }

    .h5-filter-area-panel__pane {
        // background-color: @white;
        // padding: 20px 0;
    }

    .h5-filter-area--card .h5-filter-area-panel__pane {
        background-color: transparent;
    }

    .custom-tabwrap .h5-filter-area-panel-active {
        color: #20a0ff;
    }

    .custom-tabwrap .h5-filter-area-nav-bar {
        background: #20a0ff;
    }

    .custom-pane {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }

    .h5-doc-demo-block:last-child {
        .h5-filter-area-panel__pane {
            // padding: 50px 20px;
        }
    }
}
</style>
