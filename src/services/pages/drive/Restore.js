import FetchServices from "../../core/Axios";

const Restore = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("object_ids[]",id)

    service.postMultipart("drive/restore",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {Restore} 