import FetchServices from "../../core/Axios";

const KindAchievement = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("feeds/achievement/kind/list").then(res => {
        var datas = [];
        res.data.data.map((data, i) => {
            datas.push({ "key": i, "label": data.kind, "value": data.value });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { KindAchievement }