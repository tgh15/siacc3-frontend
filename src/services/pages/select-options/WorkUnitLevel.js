import FetchServices from "../../core/Axios";

const WorkUnitLevel = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/workunit-level").then(res => {
        var datas = [];
        res.data.data.workunit_level.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.id });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}



export { WorkUnitLevel }