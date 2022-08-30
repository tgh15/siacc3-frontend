import FetchServices from "../../../core/Axios"


const Filter = ({ data, onSuccess, onFail }) => {

    new FetchServices().post("employee-biodata/position/filter", data)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Filter }