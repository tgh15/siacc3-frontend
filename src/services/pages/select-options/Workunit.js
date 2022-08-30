import FetchServices from "../../core/Axios";
import { workunitAPI } from "../configuration/workunit";

const Workunit = ({  onSuccess, onFail }) => {

    const service = new FetchServices();
    service.get("employee-biodata/workunit").then(res => {
        var datas = [];
        res.data.data.workunit.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.id, "workunit_level_id" : data.workunit_level_id, "latitude" : data.latitude, "longitude" : data.longitude, "code" : data.code, "total_data" : data.total_data });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { Workunit }