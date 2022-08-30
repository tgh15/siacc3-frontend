import FetchServices from "../../../core/Axios"


const Status = ({ data, onSuccess, onFail }) => {
    var datas = {
        uuid: data.uuid,
        email : data.email,
        status: data.status
    }

    new FetchServices().put("auth/user/status", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Status }