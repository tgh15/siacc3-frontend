import FetchServices from "../../../core/Axios"

const Delete = ({ id, photo_id, onSuccess, onFail }) => {
    new FetchServices().delete("employee-biodata/employee/delete", { photo_id: photo_id })
        .then(response => {
            new FetchServices().delete("employee-biodata/employee/delete", { id: id })
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