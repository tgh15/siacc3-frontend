import FetchServices from "../../core/Axios";

const Comment = ({  parent_id,id,comment,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("object_id",id)
    data.append("comment",comment)
    // data.append("parent_id",parent_id)

    service.postMultipart("drive/comment",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {Comment} 