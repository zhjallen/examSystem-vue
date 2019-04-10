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