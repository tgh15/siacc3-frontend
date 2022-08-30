import FetchServices from "../../../core/Axios"


const EditAccount = ({ uuid,data, onSuccess, onFail }) => {
    var datas = {
        uuid: uuid,
        username: data.username,
        password : data.password
    }

    new FetchServices().put("auth/user/password", datas).then(res => {
        onSuccess(res.data)
    }).catch(err => {
        onFail(err)
        console.log(err);
    })


}

export { EditAccount }