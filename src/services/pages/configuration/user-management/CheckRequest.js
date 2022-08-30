import FetchServices from "../../../core/Axios";


const CheckRequest = ({ uuid,onSuccess,onFail }) => {
    let data = {
        uuid : uuid
    };
    
    new FetchServices().post("auth/request/check", data)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

const CheckPassword = ({formData , onSuccess , onFail}) => {
    new FetchServices().post("auth/user/password/check", formData)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export {CheckRequest, CheckPassword}