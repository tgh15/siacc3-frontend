import FetchServices from "../../../core/Axios";


const UploadBadge = ({dataPhoto,onSuccess,onFail}) => {
    new FetchServices().postMultipart("feeds/achievement/upload-badge", dataPhoto).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
        console.log(err);
    })
}

export default UploadBadge