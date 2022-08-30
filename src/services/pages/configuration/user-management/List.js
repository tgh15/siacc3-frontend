
import FetchServices from "../../../core/Axios";

const List = ({ params, onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/employee/list", params).then(response => {
        var datas = response.data.data;
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

const LeaderList = ({params, onSuccess, onFail}) => {
    const service = new FetchServices();
    service.post("employee-biodata/employee/by-group", {group_name : 'pimpinan pusat'}).then(response => {
        var datas = response.data
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { List, LeaderList }

