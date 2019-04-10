import api from "../../utils/api/index";
import { getDataUrl } from "../../utils/functions/objFunc";

export function getSystemList(params) {
    const searchParams = {};
    Object.keys(params).map(key => {
        if (params[key] && typeof (params[key]) === "string") {
            searchParams[key] = params[key].trim();
        } else {
            searchParams[key] = params[key]
        }
    });
    const getParams = Object.assign({}, { name: "", code: "" }, searchParams)
    return api.get("/upm/system/page", { params: getParams })
}

export function addSystem(data = {}) {
    return api.post(`/upm/system/save?code=${data.code}&name=${data.name}&platformId=1`, {
        data
    })
}

export function delSystem(systemId) {
    return api.get(`/upm/system/del?ids=${systemId}`, {

    })
}

export function updateSystem(updateData) {
    const data = {
        id: updateData.id,
        code: updateData.code,
        name: updateData.name,
        url: 'updateData.url',
        platformId: 1
    }
    return api.post(`/upm/system/update${getDataUrl(data)}`)
}
