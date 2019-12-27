/**
 * 添加前导0
 */
function addZero (num:any) {
    if (num <= 9) {
        return `0${num}`;
    }
    return num;
}

/**
 * 千分符
 */
function thousands (num:any) {
    if (!num && num != 0) {
        return '';
    }
    return (num || 0).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,');
}

export default {
    addZero,
    thousands,
};
