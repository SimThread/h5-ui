/* eslint-disable */
// const version = require('../../package.json').version;

const logo = {
  image: 'https://img.yzcdn.cn/vant/logo.png',
  title: 'h5-ui',
  // version,
  href: '#/'
};

module.exports = {
  site: {
    defaultLang: 'zh-CN',
    locales: {
      'zh-CN': {
        title: 'Vant',
        description: '轻量、可靠的移动端 Vue 组件库',
        logo: 'https://img.yzcdn.cn/vant/logo.png',
        langLabel: '中文',
        links: [
          {
            logo: 'https://b.yzcdn.cn/vant/logo/weapp.svg',
            url: '/vant-weapp',
          },
          {
            logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
            url: 'https://github.com/youzan/vant',
          },
        ],
        searchConfig: {
          apiKey: '90067aecdaa2c85220e2783cd305caac',
          indexName: 'vant',
          placeholder: '搜索文档...',
        },
        showSimulator: true,
        nav: [
          {
            title: '开发指南',
            items: [
              {
                path: 'intro',
                title: '介绍'
              },
              {
                path: 'ui-develop',
                title: '组件库发布流程'
              },
              // {
              //   path: '/quickstart',
              //   title: '快速上手'
              // },
              // {
              //   path: '/changelog',
              //   title: '更新日志'
              // },
              // {
              //   path: '/style',
              //   title: '内置样式'
              // },
              // {
              //   path: '/theme',
              //   title: '定制主题'
              // },
              // {
              //   path: '/contribution',
              //   title: '开发指南'
              // },
              // {
              //   path: '/style-guide',
              //   title: '风格指南'
              // },
              // {
              //   path: '/demo',
              //   title: '示例页面'
              // }
            ]
          },
          {
            title: '全局方法',
            showInMobile: false,
            items: [
              {
                path: 'methods',
                title: 'Methods 方法'
              }
            ]
          },
          {
            title: '工具类',
            showInMobile: false,
            items: [
              {
                path: 't-date',
                title: 'Date 日期类'
              },
              {
                path: 't-number-format',
                title: 'NumberFormat 数字格式化'
              },
              {
                path: 't-url',
                title: 'URL 路径解析'
              },
              {
                path: 't-dom',
                title: 'DOM 文档对象操作'
              },
            ]
          },
          {
            title: '指令',
            showInMobile: false,
            items: [
              {
                path: 'v-anchor',
                title: 'Anchor 锚点'
              },
              {
                path: 'v-click-outside',
                title: 'ClickOutside 点击外部'
              },
            ]
          },
          {
            title: '基础组件',
            showInMobile: true,
            items: [
              // {
              //   path: '/button',
              //   title: 'Button 按钮'
              // },
              // {
              //   path: '/popup',
              //   title: 'Popup 弹出层'
              // },
              {
                path: 'icon',
                title: 'Icon 图标'
              },
              // {
              //   path: '/collapse',
              //   title: 'Collapse 折叠面板'
              // },
              // {
              //   path: '/picker',
              //   title: 'picker 选择器'
              // },
              {
                path: 'skeleton',
                title: 'Skeleton 骨架屏'
              },
              {
                path: 'scroll',
                title: 'Scroll 滑动'
              },
              // {
              //   path: '/swipe',
              //   title: 'Swipe 轮播'
              // },
              {
                path: 'lottie',
                title: 'Lottie SVG动画'
              },
              {
                path: 'svg-icon',
                title: 'SvgIcon SVG图标'
              },
              {
                path: 'empty',
                title: 'Empty 空状态'
              },
            ]
          },
          {
            title: '业务组件',
            showInMobile: true,
            items: [
              {
                path: 'share-popup',
                title: 'SharePopup 分享弹窗'
              },
              {
                path: 'filter-area',
                title: 'FilterArea 筛选区'
              },
              {
                path: 'business-filter-area',
                title: 'BusinessFilterArea 新盤篩選區'
              },
              {
                path: 'album',
                title: 'album 相冊'
              }
            ]
          }
        ]
      },
      'en-US': {
        header: {
          logo,
          nav: {
            'Vue 组件': '/#/en-US/intro',
            lang: {
              text: '中文',
              from: 'en-US',
              to: 'zh-CN'
            },
            // 'UI设计规范': '/#/design/intro',
            // github: 'https://github.com/SimThread/h5-ui'
          }
        },
        showSimulator: true,
        nav: [
          {
            title: '开发指南',
            items: [{
              path: 'intro',
              title: 'intro'
            }]
          }]
      }
    }
  }
};
