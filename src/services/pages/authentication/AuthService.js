import { authURL }      from "."
import FetchServices    from "../../core/Axios"
import { Post, Put }    from "../../core/request"

// proccess login 
const post = ({ data, onSuccess, onFail }) => {
    new FetchServices().post("auth/login", data)
        .then(response => {
            onSuccess(response)
        }).catch((err) => {
            if(err.data.message == "record not found"){
                onFail("Data akun tidak ditemukan.");
            }else if(err.data.message == 'password not match'){
                onFail("Kata sandi yang dimasukkan tidak sesuai.")
            }else{
                onFail(err.data.message)
            }
        })
}

// const loginProcess = (formData) => Post("auth/login")

// input Otp from email
const confirmOtp = ({ data, otp, onSuccess, onFail }) => {
    new FetchServices().post(`auth/login?otp=${otp}`, data)
        .then(response => {
            onSuccess(response)
        }).catch((err) => {
            onFail(err.data.message)
        })
}

const logout = ({ token, onSuccess, onFail }) => {
    if(token != null){

        new FetchServices().post(`auth/logout`, { "token": token })
            .then(response => {
                onSuccess(response)
            }).catch((err) => {
                onFail(err.data.message)
            })
    }else{
        new FetchServices().post(`auth/logout`)
            .then(response => {
                onSuccess(response)
            }).catch((err) => {
                onFail(err.data.message)
            })
    }
}

const checkToken       = () => Post(`${authURL.authPrefix}/${authURL.token}/${authURL.check}`, { token: localStorage.getItem("token") });
const checkResetDevice = (params) => Put(`auth/request/update`, null , params)

export default { 
    post: post, 
    confirmOtp: confirmOtp, 
    logout: logout, 
    checkToken: checkToken ,
    checkResetDevice
}