import FetchServices from "../../../core/Axios"

const Filter = ({ datas, onSuccess, onFail, page }) => {

    new FetchServices().post("employee-biodata/workunit/filter?page=" + page, datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Filter }
