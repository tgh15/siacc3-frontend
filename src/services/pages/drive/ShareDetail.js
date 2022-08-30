import FetchServices from "../../core/Axios";

const ShareDetail = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();

    service.post(`drive/share/${id}?type=detail`).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {ShareDetail} 