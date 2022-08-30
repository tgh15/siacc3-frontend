import FetchServices from "../../core/Axios"


const UploadAttachment = ({datas,onSuccess,onFail}) => {
    new FetchServices().post("public-report/attachment?type=image", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export default UploadAttachment