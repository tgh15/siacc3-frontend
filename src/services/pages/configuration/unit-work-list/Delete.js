import FetchServices from "../../../core/Axios"

const Delete = ({ id, logo_id, onSuccess, onFail }) => {
    new FetchServices().delete("employee-biodata/workunit/delete", { logo_id: logo_id })
        .then(response => {
            new FetchServices().delete("employee-biodata/workunit/delete", { id: id })
                .then(response => {
                    onSuccess(response.data)
                }).catch(err => {
                    onFail(err)
                })
        }).catch(err => {
            onFail(err)
        })

}

export { Delete }