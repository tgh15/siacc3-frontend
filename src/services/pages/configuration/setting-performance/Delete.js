import FetchServices from "../../../core/Axios"

const DeleteSettingPerformance = ({id,onSuccess,onFail}) => {
    new FetchServices().delete("feeds/achievement/delete",{id :id })
    .then(response=>{
        onSuccess(response.data)
    }).catch(err=>{
        onFail(err)
    })
}

export {DeleteSettingPerformance}