import FetchServices from "../../core/Axios";

const TagAddFile = ({  object_id,tag_id,onSuccess, onFail }) => {
    const service = new FetchServices();

    service.put("drive/tag/file",{
        object_id : object_id,
        tag_id : tag_id
    }).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {TagAddFile} 