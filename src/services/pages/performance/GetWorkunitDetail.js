import FetchServices from "../../core/Axios"


const GetWorkunitDetail = ({ datas, onSuccess, onFail }) => {

    new FetchServices().post("feeds/performance/workunit/detail", datas)
        .then(response => {
            if(!response.is_error){
                onSuccess(response.data)
            }
        }).catch(err => {
            onFail(err)
        })
}
export { GetWorkunitDetail }