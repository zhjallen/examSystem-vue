import api from "../../utils/api/index";
import { getDataUrl } from "../../utils/functions/objFunc";

/**
 * 获取所有系统
 *
 * @export
 * @returns
 */
export function getSystemApi() {
    return api.get("/upm/userSystemEntity/getAssociatedSystem")
}
export function getResourceApi(systemId) {
    return api.get("/upm/resource/all2", {
        params: {
            systemId
        }
    })
}

export function addNodeApi(nodeData) {
    return api.post("/upm/resource/save" + getDataUrl(nodeData))
}
/**
 * 根据资源id删除
 *
 * @export
 * @param {*} systemId
 * @returns
 */
export function delNodeById(resourceId) {
    return api.get("/upm/resource/del", {
        params: {
            ids: resourceId
        }
    })
}
export function editNodeApi(editData) {
    return api.post("/upm/resource/update" + getDataUrl(editData));
}
/**
 * 根据id获取资源详情
 *
 * @export
 * @param {string} id
 * @returns
 */
export function getDetailById(id) {
    return api.get("/upm/resource/get", {
        params: { id }
    })
}