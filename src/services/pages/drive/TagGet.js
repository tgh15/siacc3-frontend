import FetchServices from "../../core/Axios";

const TagGet = ({ id,onSuccess, onFail }) => {
    const service = new FetchServices();
    service.post(`drive/tag/get`,{
        tag_id : id,
        user_id : localStorage.getItem("uuid")
    }).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
    })
}

export {TagGet} 