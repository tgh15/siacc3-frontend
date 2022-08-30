import FetchServices from "../../../core/Axios";

const MoveToTrash = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();

    let data = new FormData();
    
    if(Array.isArray(id)){
        id.map((ids,i) => (
            data.append("object_ids[]",ids)
        ))
    }else{
        data.append("object_ids[]",id)
    }


    
    

    service.postMultipart("drive/trash",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {MoveToTrash} 