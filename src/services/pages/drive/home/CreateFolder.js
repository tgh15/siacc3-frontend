import FetchServices from "../../../core/Axios";

const CreateFolder = ({ name,dir,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("name",name);
    let url = (dir ? '?dir='+dir :  "" )

    service.postMultipart(`drive/create${url}`,data).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
    })
}

export  {CreateFolder} 