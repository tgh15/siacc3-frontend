import FetchServices from "../../core/Axios";

const User = ({ onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get(`employee-biodata/employee`).then(res => {
        var datas = [];
        res.data.data.employee.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.uuid_user });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export {User} 