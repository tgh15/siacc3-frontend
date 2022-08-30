import FetchServices from "../../core/Axios";


const UploadAttachment = ({dataFile,onSuccess,onFail}) => {

    new FetchServices().postMultipart("communication/attachment", dataFile).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
        console.log(err);
    })
}

export { UploadAttachment }