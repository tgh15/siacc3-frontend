import FetchServices from "../../core/Axios"

const Forward = ({ datas, onSuccess, onFail }) => {

    new FetchServices().post(`public-report/forward/create`,datas)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })

}

export default Forward