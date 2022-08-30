import FetchServices from "../../../core/Axios";


const UploadPhoto = ({dataPhoto,onSuccess,onFail}) => {


    new FetchServices().postMultipart("employee-biodata/employee/upload-photo", dataPhoto).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
        console.log(err);
    })
}

export { UploadPhoto }