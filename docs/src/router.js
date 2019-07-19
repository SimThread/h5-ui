import Vue from 'vue';
import docConfig from './doc.config';
import DemoList from './components/DemoList';
import componentDocs from './docs-entry';
import componentDemos from './demo-entry';
import DemoPages from './components/DemoPages';
import './utils/iframe-router';

const registerRoute = (isDemo) => {
  const route = [{
    path: '*',
    redirect: () => {
      return `/components`
    }
  }];

  Object.keys(docConfig).forEach((moduleName) => {
    if (isDemo) { // demo页面路由配置
      route.push({
        path: `/${moduleName}`,
        component: DemoList,
        meta: {
          moduleName
        }
      });
    } else { // 文档页面配置
      route.push({
        path: `/${moduleName}`,
        redirect: `/${moduleName}/intro`
      });
    }

    function addRoute(page, moduleName) {
      let { path } = page;

      if (path) {
        path = path.replace('/', '');

        // 从入口文件获取组件
        let component;
        component = isDemo ? componentDemos[path] : componentDocs[`${path}`];

        if (!component) {
          return;
        }

        route.push({
          name: `/${moduleName}/${path}`,
          component,
          path: `/${moduleName}/${path}`,
          meta: {
            moduleName,
            path,
            name: page.title
          }
        });
      }
    }

    const navs = docConfig[moduleName].nav || [];
    navs.forEach(nav => {
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(page => addRoute(page, moduleName));
        });
      } else {
        addRoute(nav, moduleName);
      }
    });
  });

  return route;
};

export default registerRoute;
