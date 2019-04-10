import api from "../../utils/api/index";
import {
    getDataUrl
} from "../../utils/functions/objFunc";

/**
 * 获取产品列表  [列表/搜索/]
 * cpk/product/queryProduct?pageNo=1&pageSize=20
 * @export
 * @returns
 */
export function getProductList(params) {
    return api.get(`/business/product/queryProduct${getDataUrl(params)}`)
   
}

/**
 *获取产品信息详情
 * @export
 * @returns
 * /business/product/getProductDetail
 */
export function getProductInfo(params) {
    return api.get(`/business/product/getProductDetail${getDataUrl(params)}`)
    // return api.get(`/infoList`)
}

/**
 *
 *获取产品基础信息详情
 * @export
 * @returns
 */
export function basicInfo(params) {
    return api.get(`/cpk/sup/basicInfo`, {
        data: params
    })
}
/**
 *
 *禁止该产品
 * @export
 * @returns
 * isEnabled: 0
 *  productCode: "GYS00017-17.25.20.30.10237"
 */

export function modifyProduct(params) {
    return api.post(`/cpk/product/modifyProduct`, {
        data: params
    })
}

///business/product/update
export function updateProduct(params) {
    return api.post(`/business/product/update`,{
        data:params
    })
}