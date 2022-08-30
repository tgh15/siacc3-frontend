import FetchServices from "../../core/Axios"

const Get = ({ keyword,orderBy, onSuccess, onFail }) => {

    let params = {
        filter : orderBy ?? "asc",
        search : keyword != null ? `${keyword}` : ""
    }

    new FetchServices().get(`public-report/reports`,params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })

}

export default Get