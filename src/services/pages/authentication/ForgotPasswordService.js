import FetchServices from "../../core/Axios"

const ForgotPasswordService = ({ data,onSuccess,onFail }) => {

    new FetchServices().post("auth/user/password", data)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err.data)
        })
}

export default ForgotPasswordService