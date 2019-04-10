import api from "../../utils/api/index";
import { getDataUrl } from "../../utils/functions/objFunc";
/**
 * 获取用户列表
 *
 * @export
 * @returns
 */
export function getUserManageList(params) {
    return api.post(`/upm/user/page${getDataUrl(params)}`)
}
/**
 * 搜索用户
 *
 * @export
 * @returns
 */
export function searchUserManageList(params) {
    return api.post(`/upm/user/page${getDataUrl(params)}`)
}
/**
 * 新增用户
 *
 * @export
 * @returns
 */
export function addUser(params) {
    return api.post("/upm/sync/u/save", {
        data:params
    })
}
/**
 * 删除用户
 *
 * @export
 * @returns
 */
export function delUser(userId) {
    return api.post(`/upm/sync/u/modify`,{
        data:userId
    })
}
/**
 * 修改用户
 *
 * @export
 * @returns
 */
export function modifyUser(params) {
    return api.post(`/upm/sync/u/modify`,{
        data:params
    })
}

/**
 * 
 *获取用户的角色资源
 * @export
 * @returns
 */

export function allUser(userId) {
    return api.get(`/upm/user/role/all`,{
        params:{
            userId
        }
    })
}
/**
 * 重置密码
 *
 * @export
 * @returns
 */

export function restPasswordUser(userId) {
    return api.post(`/upm/sync/u/restPassword${getDataUrl(userId)}`,{
        data:userId
    })
}
/**
 * 获取用户的授权
 *
 * @export
 * @returns
 */
export function associateUserSystem(params) {
    return api.post(`/upm/userSystemEntity/associateUserSystem${getDataUrl(params)}`)
}
/**
 * 获取用户授权
 *
 * @export
 * @returns
 */

export function authority(params) {
    return api.post(`/upm/user/authority${getDataUrl(params)}`)
}
/**
 * 获取用户父系统列表
 *
 * @export
 * @returns
 */
export function systemTreeByUserId(userId) {
    return api.post(`/upm/system/systemTreeByUserId`,{
        params:{
            userId
        }
    })
}