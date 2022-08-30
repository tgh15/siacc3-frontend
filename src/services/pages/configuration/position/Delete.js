import FetchServices from "../../../core/Axios"

const Delete = ({id, onSuccess, onFail, params}) => {
    new FetchServices().delete("employee-biodata/position/delete",{id :id}, params)
    .then(response=>{
        onSuccess(response.data)
    }).catch(err=>{
        onFail(err)
    })
}

export {Delete}