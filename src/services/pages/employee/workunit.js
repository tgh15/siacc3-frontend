import FetchServices from "../../core/Axios";

const WorkUnitLevelApi = ({ onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/workunit-level").then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export default WorkUnitLevelApi;