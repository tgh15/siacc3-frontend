import FetchServices from "../../../core/Axios";

const Rename = ({ id,name,onSuccess, onFail }) => {
    const service = new FetchServices();

    let data = new FormData();
    data.append("name",name);
    data.append("object_id",id);

    service.putMultipart(`drive`,data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {Rename} 