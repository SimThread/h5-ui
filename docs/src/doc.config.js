/* eslint-disable */
const version = require('../../package.json').version;

const header =  {
  logo: {
    image: 'https://statics.591.com.hk/public/images/newlogo.png',
    title: 'h5-ui',
    version,
    href: '#/'
  },
  
  nav: {
    'Vue 组件': '/#/components/intro',
    'UI设计规范': '/#/design/intro',
    github: 'https://github.com/SimThread/h5-ui'
  }
};

module.exports = {
  'components': {
    header,
    showSimulator: true,
    nav: [
      {
        name: '开发指南',
        groups: [{
          list: [{
              path: '/intro',
              title: '介绍'
            },
            {
              path: '/quickstart',
              title: '快速上手'
            },
            {
              path: '/changelog',
              title: '更新日志'
            },
            {
              path: '/style',
              title: '内置样式'
            },
            // {
            //   path: '/theme',
            //   title: '定制主题'
            // },
            {
              path: '/contribution',
              title: '开发指南'
            },
            {
              path: '/style-guide',
              title: '风格指南'
            },
            // {
            //   path: '/demo',
            //   title: '示例页面'
            // }
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
                title: '按钮'
              }
            ]
          }
        ]
      }
    ]
  },
  'design': {
    header,
    showSimulator: true,
    nav: [{
      name: '原则',
      groups: [{
        list: [
          {
            path: '/intro',
            title: '介绍'
          },
          {
            path: '/color',
            title: '颜色'
          },
        ]
      }]
    }]
  }
};
