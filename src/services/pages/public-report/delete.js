import FetchServices from "../../core/Axios"

const Delete = ({id,onSuccess,onFail}) => {

    new FetchServices().delete("public-report/report",{id :id })
    .then(response=>{
        onSuccess(response.data)
    }).catch(err=>{
        onFail(err)
    })
}

export {Delete}