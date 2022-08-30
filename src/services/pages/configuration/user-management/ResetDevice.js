import FetchServices from "../../../core/Axios"


const ResetDevice = ({ data,action, onSuccess, onFail }) => {
    var datas = {
        uuid: data.uuid_user,
        email : data.email,
        
    }

    if(action){
        datas["action"] = action;
    }

    new FetchServices().put("auth/request/reset", datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { ResetDevice }