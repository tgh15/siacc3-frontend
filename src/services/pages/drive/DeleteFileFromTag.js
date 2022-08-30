import FetchServices from "../../core/Axios";

const DeleteFileFromTag = ({  data,onSuccess, onFail }) => {
    const service = new FetchServices();

    service.delete("drive/tag/file",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {DeleteFileFromTag} 