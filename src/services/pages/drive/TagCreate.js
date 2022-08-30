import FetchServices from "../../core/Axios";

const TagCreate = ({  name,onSuccess, onFail }) => {
    const service = new FetchServices();
    let data = new FormData();
    data.append("tag",name)

    service.postMultipart("drive/tag/create",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {TagCreate}