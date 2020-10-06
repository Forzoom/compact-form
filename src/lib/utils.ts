/**
 * 是否是null或者undefined
 *
 * @param {} v 参数
 *
 * @return {boolean}
 */
export function isUndef(v: any): v is (null | undefined) {
    return v === null || v === undefined;
}

/**
 * 对于数字进行format操作
 */
export function _format(n: number) {
    if (n >= 0 && n < 10) {
        return '0' + n;
    } else {
        return `${n}`;
    }
}

/**
 * 日期格式化
 *
 * @param {Date|Number} v UTC+08:00
 * @param {String} format 格式内容
 *
 * @return {string} 经过format的日期数据
 */
export function dateFormat(v: number | Date | null, format?: string | null): any {
    const type = typeof v;
    if (isUndef(v) || (type !== 'number' && !(v instanceof Date))) {
        return v;
    }
    // 使用默认的format
    if (!format) {
        format = 'Y-M-D';
    }
    if (typeof v === 'number') {
        v = new Date(v);
    }

    format = format!.replace('Y', String(v.getFullYear()));
    // format = format!.replace('m', String(v.getMonth() + 1));
    format = format!.replace('m', String(_format(v.getMonth() + 1)));
    // format = format!.replace('d', String(v.getDate()));
    format = format!.replace('d', String(_format(v.getDate())));
    format = format!.replace('H', String(_format(v.getHours())));
    format = format!.replace('i', String(_format(v.getMinutes())));
    format = format!.replace('s', String(_format(v.getSeconds())));

    return format;
}

export const formatMap = {
    date: 'Y-m-d',
    datetime: 'Y-m-d H:i',
    time: 'H:i:s',
    'year-month': 'Y-m',
    'month-day': 'm-d',
    datehour: 'H:i',
}
