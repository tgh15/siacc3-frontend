import FetchServices from "../../core/Axios";

const Position = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/position").then(res => {
        var datas = [];
        res.data.data.position.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.id });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

const PositionList = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/position/list").then(res => {
        var datas = [];
        res.data.data.map((data, i) => {
            datas.push({"label": data.name, "value": data.id});
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { Position, PositionList};