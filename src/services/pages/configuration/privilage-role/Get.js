import FetchServices from "../../../core/Axios";

const Get = ({params,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.get("auth/groups", params).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { Get }