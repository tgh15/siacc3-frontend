import FetchServices from "../../core/Axios"

const DeleteBanner = ({id,onSuccess,onFail}) => {

    new FetchServices().delete("public-report/banner",{id : id })
    .then(response=>{
        onSuccess(response.data)
    }).catch(err=>{
        onFail(err)
    })
}

export {DeleteBanner}