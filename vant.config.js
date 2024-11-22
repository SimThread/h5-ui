module.exports = {
  name: 'h5-ui',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/h5-ui/',
    },
  },
  site: {
    title: 'h5-ui',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'scroll',
            title: 'Scroll 滚动',
          },
          {
            path: 'skeleton',
            title: 'Skeleton 骨架屏',
          },

          {
            path: 'empty',
            title: 'Empty 空状态',
          },
          {
            path: 'icon',
            title: 'Icon 图标',
          },
          {
            path: 'svg-icon',
            title: 'SvgIcon 图标',
          },
          {
            path: 'lottie',
            title: 'Lottie 动画',
          },
        ],
      },
      {
        title: '业务组件',
        items: [
          {
            path: 'share-popup',
            title: 'SharePopup 分享弹窗',
          },
          {
            path: 'album',
            title: 'Album 相册',
          },
          {
            path: 'business-filter-area',
            title: 'BusinessFilterArea 筛选框',
          },
        ],
      },
      {
        title: '指令',
        items: [
          {
            path: 'v-anchor',
            title: 'Anchor 锚点',
          },
          {
            path: 'v-click-outside',
            title: 'ClickOutside 点击外部',
          },
        ],
      },
      {
        title: '工具类',
        items: [
          {
            path: 't-date',
            title: 'Date 日期类',
          },
          {
            path: 't-dom',
            title: 'DOM 文档对象操作',
          },
        ],
      },
    ],
  },
};
