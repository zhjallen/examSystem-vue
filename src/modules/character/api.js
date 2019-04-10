import api from "../../utils/api/index";
import {
    getDataUrl
} from "../../utils/functions/objFunc";

/**
 * 获取角色列表
 *
 * @export
 * @returns
 */
export function getCharacterList(params) {
    return api.post(`/upm/role/queryPageByUserId${getDataUrl(params)}`)
}

/**
 * 添加角色
 *
 * @export
 * @returns
 */
export function saveCharacter(params) {
    return api.post(`/upm/role/save`, {
        data: params
    })
}
/**
 * 搜索角色列表
 *
 * @export
 * @returns
 */
export function searchCharacterList(params) {
    return api.get(`/upm/role/queryPageByUserId${getDataUrl(params)}`)
}

/**
 * 修改角色
 *
 * @export
 * @returns
 */
export function updateCharacter(params) {
    return api.post(`/upm/role/update`, {
        data: params
    })
}

/**
 * 删除角色
 *
 * @export
 * @returns
 */
export function delCharacter(params) {
    return api.get(`/upm/role/del`, {
        params
    })
}

/**
 * 获取角色所有系统
 *
 * @export
 * @returns
 */
export function getAssociatedSystem() {
    return api.get(`/upm/userSystemEntity/getAssociatedSystem`)
}
/**
 * 角色授权
 *
 * @export
 * @returns
 */
export function authority(data = {}) {
    return api.post(`/upm/role/authority?roleId=${data.roleId}&resourceIds=${data.resourceIds}`)
}
/**
 * 获取角色所有的资源
 *
 * @export
 * @returns
 */

export function resource(roleId) {
    return api.get(`/upm/role/resource`, {
        params: {
            roleId
        }
    })
}