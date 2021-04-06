import Locale from '../../../src/locale';
import zhCN from '../../../src/locale/lang/zh-CN';
import enUS from '../../../src/locale/lang/en-US';

const ZH_CN = 'zh-CN';
const EN_US = 'en-US';
const CACHE_KEY = 'active';

const langMap = {
    'en-US': {
        title: 'Vant - Lightweight Mobile UI Components built on Vue',
        messages: enUS
    },
    'zh-CN': {
        title: 'Vant - 轻量、可靠的移动端 Vue 组件库',
        messages: zhCN
    }
};

let currentLang = ZH_CN;

export function getLang() {
    return currentLang;
}

export function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(CACHE_KEY, lang);

    Locale.use(lang, langMap[lang].messages);
    document.title = langMap[lang].title;
}

export function setDefaultLang(langFromConfig) {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
        currentLang = cached;
        return;
    }

    if (navigator.language && navigator.language.indexOf('zh-') !== -1) {
        currentLang = ZH_CN;
        return;
    }

    currentLang = langFromConfig || EN_US;
}
