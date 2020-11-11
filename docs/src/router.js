import docConfig from './doc.config';
import DemoList from './components/DemoList.vue';
import componentDocs from './docs-entry';
import componentDemos from './demo-entry';
import { getLang, setDefaultLang } from './utils/locales';
import './utils/iframe-router';

console.log('iframe-router after');

const { locales, defaultLang } = docConfig.site;

setDefaultLang(defaultLang);

function getLangFromRoute(route) {
    const lang = route.path.split('/')[1];
    const langs = Object.keys(locales);

    if (langs.indexOf(lang) !== -1) {
        return lang;
    }

    return getLang();
}

const registerRoute = (isMobileDemo) => {
    const route = [{
        path: '*',
        redirect: route => `/${getLangFromRoute(route)}`
    }];

    Object.keys(docConfig.site.locales).forEach((lang) => {
        if (isMobileDemo) { // demo页面路由配置
            route.push({
                path: `/${lang}`,
                component: DemoList,
                meta: {
                    lang
                }
            });
        } else { // 文档页面配置
            route.push({
                path: `/${lang}`,
                redirect: (r) => `/${lang}/intro`
            });
        }

        function addRoute(page, lang) {
            let { path } = page;

            if (path) {
                path = path.replace('/', '');

                // 从入口文件获取组件
                const componentDoc = componentDocs[`${path}.${lang}`] ? componentDocs[`${path}.${lang}`] : componentDocs[`${path}.${defaultLang}`];
                const component = isMobileDemo ? componentDemos[path] : componentDoc;

                if (!component) {
                    return;
                }

                route.push({
                    name: `/${lang}/${path}`,
                    component,
                    path: `/${lang}/${path}`,
                    meta: {
                        lang,
                        path,
                        name: page.title
                    }
                });
            }
        }

        const navs = docConfig.site.locales[lang].nav || [];
        navs.forEach(nav => {
            if (nav.groups) {
                nav.groups.forEach(group => {
                    group.list.forEach(page => addRoute(page, lang));
                });
            } else {
                addRoute(nav, lang);
            }
        });
    });

    return route;
};

export default registerRoute;
