/**
 * 根据数组中每个项的id或treeId将数组处理为对象
 *
 * @export
 * @param {Array<any>} arr
 * @param {string} key 需要根据数组对象的哪个属性生成对象
 * @returns
 */
export function arrayToObj(arr: Array<any>, key: string) {
    const obj = {};
    if (!Array.isArray(arr)) {
        return obj;
    } else {
        arr.map(item => {
            const prop = item[key] || item["id"];
            obj[prop] = item;
        })
    }
    return obj;
}

/**
 * 根据对象关系将对象转换为树形数组
 *
 * @export
 * @param {Object} obj 需要转换的对象
 * @param {string} parentKey 查找父节点的属性
 * @returns
 */
export function getListTree(obj: Object, parentKey: string) {
    const listTree = [];
    Object.keys(obj).map(key => {
        const parentItem = obj[obj[key][parentKey]];
        if (!parentItem) {
            listTree.push(obj[key])
        } else {
            if (parentItem.children) {
                parentItem.children.push(obj[key]);
            } else {
                parentItem.children = [obj[key]]
            }
        }
    })
    return listTree;
}