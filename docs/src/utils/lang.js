import Locale from '../../../packages/locale';
import zhCN from '../../../packages/locale/lang/zh-CN';

let currentLang = '';

export function setLang(lang) {
    if (currentLang === lang) {
        return;
    }

    currentLang = lang;
    Locale.use(lang, zhCN);
}

setLang('components');
