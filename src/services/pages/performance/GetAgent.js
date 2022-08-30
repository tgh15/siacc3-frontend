import FetchServices from "../../core/Axios"


const GetAgent = ({ keyword,params, onSuccess, onFail }) => {

    let keywords = keyword != null ? `?keyword=${keyword}` : "";
    
    new FetchServices().get(`feeds/performance/agent${keywords}`, params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}
export { GetAgent }