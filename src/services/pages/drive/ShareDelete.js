import FetchServices from "../../core/Axios";

const ShareDelete = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();

    service.delete(`drive/share/${id}`,).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {ShareDelete} 