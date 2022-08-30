import FetchServices from "../../core/Axios"


const AgentPointsDeduction = ({ datas, onSuccess, onFail }) => {
    new FetchServices().post("feeds/agent-points/points-deduction", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { AgentPointsDeduction }