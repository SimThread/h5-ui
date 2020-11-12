<template>
    <demo-section style="height: 2000px;">
        <demo-block title="基本用法">
            <h5-swipe ref="swiper" class="imgList" :show-indicators="indicators" style="height: 280px; overflow: hidden;" @change="onSwipeChange">
                <template v-for="(imgType, parentIndex) in swiperList">
                    <h5-swipe-item v-for="(item, childIndex) in imgType.img" :key="`${imgType.name}-${childIndex}`" :data-type="`${item.type ? item.type : 'image'}-${childIndex}`" @click="goImgDisplay(item, parentIndex, childIndex)">
                        <img v-lazy="item.thumb" src="https://newhouse.debug.591.com.hk/_nuxt/img/5575d6e.png" :alt="`${imgType.name}`">
                        <div id="img-logo" class="img-logo" :class="getTypeClass(item.type)" />
                    </h5-swipe-item>
                </template>
                <template #indicator>
                    <h5-swipe-switch v-model="switchCurrentVal" :types="swiperTypes" @change="onSwitchChange" />
                    <div class="custom-indicator">{{ swiperCurrent + 1 }}/{{ count(swiperList) }}</div>
                </template>
            </h5-swipe>

            <h5-album
                v-if="showAlbum"
                :type-index="typeIndex"
                :pos-index="posIndex"
                :swiper-list="swiperList"
                :show-preview.sync="showPreview"
                :show-nav-right="true"
                nav-right-text="全部"
                @close="showAlbum = false"
            >
                <div slot="footer" class="footer">底部banner</div>
                <div class="album-logo" slot="vr">vr-logo</div>
                <div class="album-logo" slot="video">video-logo</div>
                <div class="disclaimer-btn" v-show="showPreview">免责声明</div>
            </h5-album>
        </demo-block>
    </demo-section>
</template>

<script>
function imgAdapter(data) {
    const swiperList = JSON.parse(JSON.stringify(data.img_list));

    if (data.video_list.list.length > 0) {
        const videoObj = {
            name: data.video_list.name,
            img: []
        };
        for (let i = 0; i < data.video_list.list.length; i++) {
            const item = {
                type: 'video',
                link_url: data.video_list.list[i].video,
                src: data.video_list.list[i].video_img,
                thumb: data.video_list.list[i].video_img,
                note: data.video_list.list[i].note
            };
            videoObj.img.push(item);
        }
        swiperList.unshift(videoObj);
    }

    if (data.vr_list.list.length > 0) {
        const vrObj = {
            name: data.vr_list.name,
            img: []
        };
        for (let i = 0; i < data.vr_list.list.length; i++) {
            const item = {
                type: 'vr',
                link_url: data.vr_list.list[i].link_url,
                src: data.vr_list.list[i].background_img,
                thumb: data.vr_list.list[i].background_img,
                note: data.vr_list.list[i].note
            };
            vrObj.img.push(item);
        }
        swiperList.unshift(vrObj);
    }

    return swiperList;
}

export default {
    data() {
        return {
            showPreview: false,
            swiperCurrent: 0,
            indicators: false,
            swiperList: [],
            showAlbum: false,
            swiperTypes: [
                {
                    name: 'vr',
                    text: '720環景'
                },
                {
                    name: 'video',
                    text: '視頻'
                },
                {
                    name: 'image',
                    text: '圖像'
                }
            ],
            switchCurrentVal: 'vr',
            typeIndex: 0,
            posIndex: 0
        };
    },
    watch: {
        showPreview(newVal, oldVal) {
            console.log('newVal:', newVal);
        }
    },
    created() {
        const data = {
            img_list: [
                {
                    name: '示範單位',
                    img: [
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_240x180.thumb.jpg'
                        }
                    ]
                },
                {
                    name: '屋苑大厦',
                    img: [
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_240x180.thumb.jpg'
                        }
                    ]
                },
                {
                    name: '周边环境',
                    img: [
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_240x180.thumb.jpg'
                        }
                    ]
                },
                {
                    name: '商超餐饮',
                    img: [
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065700407_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068038609_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012065735001_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012068244501_240x180.thumb.jpg'
                        },
                        {
                            note: '',
                            src: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_800x800.thumb.jpg',
                            thumb: 'https://p1.debug.591.com.hk/newhouse/active/2020/07/29/159599012069192206_240x180.thumb.jpg'
                        }
                    ]
                }
            ],
            video_list: {
                list: [
                    {
                        note: '',
                        video: 'https://www.debug.591.com.hk/Home/House/video.html?vimeo_video_id=442567743&autoplay=1&muted=1',
                        video_img: 'https://i.vimeocdn.com/video/931584203_600x450.jpg?r=pad'
                    }
                ],
                name: '視頻'
            },
            vr_list: {
                name: '720環景',
                list: [
                    {
                        link_url: 'https://pano.debug.591.com.hk/vr/show?id=7&type=3',
                        note: '',
                        background_img: 'https://www.debug.591.com.hk/Public/Static/images/client_360-min.jpg'
                    }
                ]
            }
        };

        this.swiperList = imgAdapter(data);
    },
    methods: {
        goImgDisplay(item, parentIndex, childIndex) {
            this.showAlbum = true;
            this.typeIndex = parentIndex;
            this.posIndex = childIndex;
        },
        onSwipeChange(index) {
            this.swiperCurrent = index;
            this.switchCurrentVal = document.querySelectorAll('.h5-swipe-item')[index].getAttribute('data-type').split('-')[0];
        },
        getTypeClass(type) {
            if (type == 'vr') {
                return 'vr-logo';
            }
            if (type == 'video') {
                return 'video-logo';
            }
            return '';
        },
        count(swiperList) {
            let i = 0;
            swiperList.forEach(item => {
                item.img.forEach(img => {
                    i++;
                });
            });
            return i;
        },
        getIndex(ele) {
            const parentEle = ele.parentNode;
            const nodes = Array.prototype.slice.call(parentEle.children);
            return nodes.indexOf(ele);
        },
        onSwitchChange(type) {
            if (type === 'vr') {
                this.$refs.swiper.swipeTo(this.getIndex(document.querySelector("[data-type='vr-0']")));
            } else if (type === 'video') {
                this.$refs.swiper.swipeTo(this.getIndex(document.querySelector("[data-type='video-0']")));
            } else {
                this.$refs.swiper.swipeTo(this.getIndex(document.querySelector("[data-type='image-0']")));
            }
        }
    }
};
</script>

<style lang="less">
.demo-album {
    .h5-swipe {
        img {
            width: 100%;
        }
    }
    .h5-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        img {
            pointer-events: none;
        }
    }

    .swiper-switch {
        position: absolute;
        top: 200px;
        width: 100%;
        z-index: 999;
    }
    .custom-indicator {
        position: absolute;
        right: 16px;
        bottom: 60px;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
    }
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        background: #0c5ffe;
        color: #fff;
    }
    .album-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
    }
    .disclaimer-btn {
        position: fixed;
        width: 80px;
        height: 26px;
        line-height: 26px;
        top: 94px;
        right: 15px;
        z-index: 99;
        border-radius: 10px;
        color: #666;
        text-align: center;
        background: rgba(0, 0, 0, .5);
    }
}
</style>
