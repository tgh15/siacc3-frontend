import FetchServices from "../../core/Axios";

const Delete = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();

    if(Array.isArray(id)){
        id.forEach((ids,i) => {
            data.append("object_ids[]",ids)
        })
    }else{
        data.append("object_ids[]",id)
    }
    

    service.deleteMultipart("drive",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {Delete} 