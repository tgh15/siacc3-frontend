import FetchServices from "../../core/Axios"


const GetAgentDetail = ({ datas, onSuccess, onFail }) => {

    new FetchServices().post("feeds/performance/agent/detail", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}
export { GetAgentDetail }