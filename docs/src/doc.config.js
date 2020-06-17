/* eslint-disable */
const version = require('../../package.json').version;

const logo = {
  image: 'https://img.yzcdn.cn/vant/logo.png',
  title: 'h5-ui',
  version,
  href: '#/'
};

module.exports = {
  site: {
    defaultLang: 'zh-CN',
    locales: {
      'zh-CN': {
        header: {
          logo,
          nav: {
            'Vue 组件': '/#/zh-CN/intro',
            lang: {
              text: 'En',
              from: 'zh-CN',
              to: 'en-US'
            },
            // 'UI设计规范': '/#/design/intro',
            // github: 'https://github.com/SimThread/h5-ui'
          }
        },
        showSimulator: true,
        nav: [
          {
            name: '开发指南',
            groups: [{
              list: [
                {
                  path: '/intro',
                  title: '介绍'
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
            }]
          },
          {
            name: '全局方法',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/methods',
                  title: 'Methods 方法'
                }
              ]
            }]
          },
          {
            name: '工具类',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/t-date',
                  title: 'Date 日期类'
                },
                {
                  path: '/t-number-format',
                  title: 'NumberFormat 数字格式化'
                },
                {
                  path: '/t-url',
                  title: 'URL 路径解析'
                },
                {
                  path: '/t-dom',
                  title: 'DOM 文档对象操作'
                },
              ]
            }]
          },
          {
            name: '指令',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/v-anchor',
                  title: 'Anchor 锚点'
                },
                {
                  path: '/v-click-outside',
                  title: 'ClickOutside 点击外部'
                },
              ]
            }]
          },
          {
            name: '组件',
            showInMobile: true,
            groups: [
              {
                groupName: '基础组件',
                list: [
                  {
                    path: '/button',
                    title: 'Button 按钮'
                  },
                  // {
                  //   path: '/popup',
                  //   title: 'Popup 弹出层'
                  // },
                  {
                    path: '/icon',
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
                    path: '/skeleton',
                    title: 'Skeleton 骨架屏'
                  }
                ]
              },
              {
                groupName: '表单组件',
                list: [
                  {
                    path: '/checkbox',
                    title: 'Checkbox 复选框'
                  },
                  {
                    path: '/field',
                    title: 'Field 输入框'
                  },
                ]
              },
              {
                groupName: '业务组件',
                list: [
                  {
                    path: '/share-popup',
                    title: 'SharePopup 分享弹窗'
                  },
                  {
                    path: '/filter-area',
                    title: 'FilterArea 筛选区'
                  },
                  {
                    path: '/business-filter-area',
                    title: 'BusinessFilterArea 新盤篩選區'
                  }
                ]
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
            name: '开发指南',
            groups: [{
              list: [
                {
                  path: '/intro',
                  title: 'intro'
                },
              ]
            }]
          },
          {
            name: '全局方法',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/methods',
                  title: 'Methods'
                }
              ]
            }]
          },
          {
            name: '工具类',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/t-date',
                  title: 'Date'
                },
                {
                  path: '/t-number-format',
                  title: 'NumberFormat'
                },
                {
                  path: '/t-url',
                  title: 'URL'
                },
                {
                  path: '/t-dom',
                  title: 'DOM'
                },
              ]
            }]
          },
          {
            name: '指令',
            showInMobile: false,
            groups: [{
              list: [
                {
                  path: '/v-anchor',
                  title: 'Anchor'
                },
                {
                  path: '/v-click-outside',
                  title: 'ClickOutside'
                },
              ]
            }]
          },
          {
            name: '组件',
            showInMobile: true,
            groups: [
              {
                groupName: '基础组件',
                list: [
                  {
                    path: '/button',
                    title: 'Button'
                  },
                  // {
                  //   path: '/popup',
                  //   title: 'Popup 弹出层'
                  // },
                  {
                    path: '/icon',
                    title: 'Icon'
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
                    path: '/skeleton',
                    title: 'Skeleton'
                  }
                ]
              },
              {
                groupName: '表单组件',
                list: [
                  {
                    path: '/checkbox',
                    title: 'Checkbox'
                  },
                  {
                    path: '/field',
                    title: 'Field'
                  },
                ]
              },
              {
                groupName: '业务组件',
                list: [
                  {
                    path: '/share-popup',
                    title: 'SharePopup'
                  },
                  {
                    path: '/filter-area',
                    title: 'FilterArea'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
};
