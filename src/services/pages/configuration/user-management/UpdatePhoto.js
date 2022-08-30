import FetchServices from "../../../core/Axios";


const UpdatePhoto = ({ dataPhoto, onSuccess,onFail}) => {

    new FetchServices().postMultipart("employee-biodata/employee/update-photo", dataPhoto).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
    })
}

export {UpdatePhoto}