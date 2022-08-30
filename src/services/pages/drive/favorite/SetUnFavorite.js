import FetchServices from "../../../core/Axios";

const SetUnFavorite = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("object_ids[]",id)

    service.putMultipart("drive/favorite",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {SetUnFavorite} 