import FetchServices from "../../../core/Axios";

const StaticBadge = ({onSuccess,onFail}) => {
    const service = new FetchServices();
    service.get("drive/static/badge").then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { StaticBadge }