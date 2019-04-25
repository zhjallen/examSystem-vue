/**
 * 将对象转为url的参数形式
 *
 * @param {object} data
 * @returns
 */
export function getDataUrl(data: Object) {
    let paramsUrl = "?";

    Object.keys(data).map((key, index, keys) => {
        if (data[key]) {
            if (index === keys.length - 1) {
                paramsUrl += `${key}=${data[key]}`;
            } else {
                paramsUrl += `${key}=${data[key]}&`;
            }
        }
    })
    return paramsUrl;
}
/**
 * 处理查询条件
 * @param queryObj 获取到的查询对象
 */
export function getQueryParams(queryObj: Object) {
    const queryParams = {};
    Object.keys(queryObj).map(key => {
        if (queryObj[key] && typeof (queryObj[key]) === "string") {
            queryParams[key] = queryObj[key].trim();
        } else {
            queryParams[key] = queryObj[key];
        }
    })
    return queryParams;
}