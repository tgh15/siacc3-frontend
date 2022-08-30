import FetchServices from "../../core/Axios"

const GetAgentByWorkunit = ({ params, onSuccess, onFail }) => {

    new FetchServices().post("feeds/performance/agent/lokal", params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}
export { GetAgentByWorkunit }