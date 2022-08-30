import FetchServices from "../../core/Axios";

const Get = ({ path,onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get(`drive${path ?? ""}`).then(res => {
        onSuccess(res.data.data)
    }).catch(err => {
        onFail(err)
    })
}

export {Get} 