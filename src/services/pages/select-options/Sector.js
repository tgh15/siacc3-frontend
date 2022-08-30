import FetchServices from "../../core/Axios";

const Sector = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/sector").then(res => {
        var datas = [];
        res.data.data.sector.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.id });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { Sector }