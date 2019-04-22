import api from "../../../utils/api";

/**
 * 获取用户列表
 *
 * @export
 * @param {*} password
 */
export function getUserListApi(params) {
    return api.get("/userlist", {
        params
    })
}

/**
 * 新增用户
 * @param {Object} userInfo 用户信息 
 */
export function addUserApi(userInfo) {
    return api.post("/user/add", {
        data: userInfo
    })
}