import FetchServices from "../../core/Axios"

const GetWorkunit = ({ keyword,params, onSuccess, onFail }) => {

    let keywords = keyword != null ? `?keyword=${keyword}` : "";

    new FetchServices().post(`feeds/performance/workunit${keywords}`, params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}
export { GetWorkunit }