/**
 * 将资源对象转换为树形结构
 *
 * @export
 * @param {Object} resourceOjb
 * @returns  
 */
export function getResourceListTree(resourceOjb: Object) {
    const listTree = [];
    // const temp = {};
    // resourceList.forEach(resource => {
    //     temp[resource.id] = resource;
    //     if (!resource.parentId) {
    //         temp[resource.id].children = []
    //     }
    // })
    Object.keys(resourceOjb).map(key => {
        const parentItem = resourceOjb[resourceOjb[key].parentId];
        if (!parentItem) {
            listTree.push(resourceOjb[key])
        } else {
            if (parentItem.children) {
                parentItem.children.push(resourceOjb[key]);
            } else {
                parentItem.children = [resourceOjb[key]]
            }
        }
    })
    return listTree;
}
/**
 * 将资源数组转换为一个对象
 *
 * @export
 * @param {Array<any>} resourceList
 * @returns
 */
export function getResourceListOjb(resourceList: Array<any>) {
    const resourceOjb = {};
    resourceList.forEach(resource => {
        resourceOjb[resource.id] = resource;
        if (!resource.parentId) {
            resourceOjb[resource.id].children = []
        }
    })
    return resourceOjb;
}

export function findChildProps(treeList:Array<any>, parentPropName) {
    
}
export function delResourceObjByPropName(obj, propName) {
    if (propName) {
        Object.keys(obj).map(key => {
            if (obj[key].parentId === propName) {

            }
        })
    }
}