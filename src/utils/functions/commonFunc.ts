import store from "../../store";

/**
 * 关闭标签页
 *
 * @export
 * @param {*} route  路由
 */
export function closeTag(route) {
    store.dispatch("removeTag", route)
}