import FetchServices from "../../../core/Axios";

const Get = ({ params, onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/workunit", params).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

const GetById = ({ id, onSuccess, onFail }) => {
    const service = new FetchServices();
    service.post("employee-biodata/workunit/detail", { id: parseInt(id) })
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

const GetByLevel = ({ data, onSuccess, onFail, page }) => {
    const service = new FetchServices();
    service.post("employee-biodata/workunit/by-level?page=" + page, data)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

const GetMap = ({ onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/workunit/list")
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

const GetChild = ({ formData, onSuccess, onFail }) => {
    const service = new FetchServices();
    service.post("employee-biodata/workunit/filter", formData)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}
export { Get, GetById, GetByLevel, GetMap, GetChild }