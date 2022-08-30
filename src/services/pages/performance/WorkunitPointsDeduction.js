import FetchServices from "../../core/Axios"


const WorkunitPointsDeduction = ({ datas, onSuccess, onFail }) => {
    new FetchServices().post("feeds/agent-points/workunit/points-deduction", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { WorkunitPointsDeduction }