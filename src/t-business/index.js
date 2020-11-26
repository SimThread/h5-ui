// 保存localstorage
function setHistory (name, keyword) {
    if (`${keyword}`.trim() === '') {
        return;
    }
    if (localStorage[name] === undefined) {
        localStorage[name] = keyword;
    } else {
        localStorage[name] = keyword + ',' + localStorage[name].split(',').filter(e => e != keyword).join(',');
    }
}

// 清除localstorage
export function clearHistory (name) {
    localStorage.removeItem(name);
}

export class KeyWordManger {
    constructor(name) {
        this.name = name;
    }

    setHistoryKeyword(keyword) {
        setHistory(this.name, keyword);
    }

    getHistoryKeyword() {
        let returnKeywords = [];
        const keywords = localStorage.getItem(this.name);
        if (keywords) {
            returnKeywords = JSON.parse(JSON.stringify(keywords.split(',').slice(0, 10)));
        }
        return returnKeywords;
    }

    clearHistoryKeyword() {
        clearHistory(this.name);
    }
}

export default {
    setHistory,
    clearHistory,
    KeyWordManger
};
