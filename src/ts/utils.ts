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
