import FetchServices from "../../../core/Axios";

const SetFavorite = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("object_ids[]",id)

    service.postMultipart("drive/favorite",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {SetFavorite} 