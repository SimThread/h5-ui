/**
 * 拷贝自[vux](https://vux.li/)
 * 日期对象转字符串
 */
interface Week {
  [key: string]: any,
}

interface O {
  [key: string]: any,
}

function dateFormat (date: string | number | Date, fmt: string = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) {
        return '';
    }
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'));
    }
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const o:O = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    const week:Week = {
        0: '\u65e5',
        1: '\u4e00',
        2: '\u4e8c',
        3: '\u4e09',
        4: '\u56db',
        5: '\u4e94',
        6: '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
    }
    Object.keys(o).forEach((k:any) => {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    });
    return fmt;
}

function second2Remain(s: number): { [key: string]: any } {
    const day = window.parseInt(String(s / (60 * 60 * 24)));
    const hour = window.parseInt(String((s % (60 * 60 * 24)) / (60 * 60)));
    const minute = window.parseInt(String((s % (60 * 60)) / 60));
    const second = window.parseInt(String((s % 60)));

    return {
        day,
        hour,
        minute,
        second
    };
}

export default {
    dateFormat,
    second2Remain
};
