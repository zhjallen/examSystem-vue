import api from "../../utils/api";

/**
 * 获取加密后的密码
 *
 * @export
 * @param {*} password
 */
export function getAesString(password) {
    api.get("/passport/aes/getKey", {
        params: {
            password
        }
    })
} 