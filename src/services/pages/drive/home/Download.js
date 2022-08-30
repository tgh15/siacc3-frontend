import FetchServices from "../../../core/Axios";

const Download = ({ id,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("object_ids[]",id);

    service.postMultipart(`drive/download`,data).then(res => {
        onSuccess(res.data.data)
    }).catch(err => {
        onFail(err)
    })
}

export  {Download} 